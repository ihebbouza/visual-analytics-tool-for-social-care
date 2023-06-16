# For the error messages
from flask import request
from flask_restful import Resource
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from libs.strings import gettext
from models.user import UserModel
from schemas.schemas import UserSchema, VisualizationSchema, PostSchema

user_schema = UserSchema()
user_list_schema = UserSchema(many=True)
visualization_schema = VisualizationSchema()
visualization_list_schema = VisualizationSchema(many=True)
post_schema = PostSchema()
post_list_schema = PostSchema(many=True)

class UserRegisterResource(Resource):
    # Register a new user
    @classmethod
    def post(cls):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        if UserModel.find_by_username(username) or UserModel.find_by_email(email):
            return {"message": gettext("username_or_email_exists")}, 400
        user = UserModel(
            username=username,
            email=email,
            password=generate_password_hash(password)
        )
        user.save()
        access_token = create_access_token(identity=user.id, fresh=True)
        refresh_token = create_refresh_token(user.id)

        return {
            "user": user_schema.dump(user),
            "access_token": access_token,
            "refresh_token": refresh_token
        }, 201
    
class UserLoginResource(Resource):
    # login user
    @classmethod
    def post(cls):
        data = request.get_json()
        user_entered = UserModel(
            username=data.get("username"),
            password=data.get("password")
        )
        username_in_db = UserModel.find_by_username(user_entered.username)
        if username_in_db and check_password_hash(username_in_db.password, user_entered.password):
            access_token = create_access_token(identity=username_in_db.id, fresh=True)
            refresh_token = create_refresh_token(username_in_db.id)
            return {"user": user_schema.dump(username_in_db), "access_token": access_token, "refresh_token": refresh_token}, 200
        return {"message": gettext("invalid_credentials")}, 401

################ Refresh token ######################
class TokenRefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return {"access_token": new_access_token}, 200
###### Add user logout functionality using the BLOCKLIST ########

class UserResource(Resource):
    # get existing user
    @jwt_required()
    def get(self, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": gettext("user_not_found")}, 404
        return user_schema.dump(user), 200

    # delete existing user
    @jwt_required()
    def delete(self, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": gettext("user_not_found")}, 404
        user.delete()
        return {"message": gettext("user_deleted")}, 200

########################## Get all user posts #####################################
class UserAllPostsResource(Resource):
    # get a post's comments ()
    @jwt_required()
    def get(self, user_id):
        user = UserModel.find_by_id(user_id)
        if user is None:
            return {'message': gettext("user_not_found")}, 404
        posts = user.posts
        return post_list_schema.dump(posts), 200

########################## Get all user visualizations #####################################
class UserAllVisualizationsResource(Resource):
    # get a post's comments ()
    @jwt_required()
    def get(self, user_id):
        user = UserModel.find_by_id(user_id)
        if user is None:
            return {'message': gettext("user_not_found")}, 404
        visualizations = user.visualizations
        return visualization_list_schema.dump(visualizations), 200

########################## Get all user comments #####################################
class UserListResource(Resource):
    # get all users (ADMIN ONLY)
    def get(self):
        users = UserModel.find_all()
        return user_list_schema.dump(users), 200

    # delete all users (ADMIN ONLY)
    def delete(self):
        users = UserModel.find_all()
        if not users:
            return {"message": gettext("users_not_found")}, 404
        for user in users:
            user.delete()
        return {"message": gettext("users_deleted")}, 200