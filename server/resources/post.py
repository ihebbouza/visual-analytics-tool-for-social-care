from libs.strings import gettext # For the error messages
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required

from models.post import PostModel
from schemas.schemas import PostSchema, VisualizationSchema

post_schema = PostSchema()
post_list_schema = PostSchema(many=True)
visualization_schema = VisualizationSchema()
visualization_list_schema = VisualizationSchema(many=True)

class PostResource(Resource):
    # create a new post (LOGGED IN)
    @jwt_required()
    def post(self):
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        user_id = get_jwt_identity()
        print("user_id: ", user_id)
        post = PostModel(
            title=title,
            description=description,
            user_id=user_id
        )
        post.save()
        return post_schema.dump(post), 201
    
    # update a post (LOGGED IN && AUTHOR)
    @jwt_required()
    def put(self, post_id):
        post = PostModel.find_by_id(post_id)
        if post is None:
            return {'message': gettext("post_not_found")}, 404
        if post.user_id != get_jwt_identity():
            print("post: ", post._id)
            return {'message': gettext("post_not_author")}, 403
        data = request.get_json()
        post.title = data['title']
        post.description = data['description']
        post.save()
        return post_schema.dump(post), 200
    
    # delete a post (LOGGED IN && AUTHOR)
    @jwt_required()
    def delete(self, post_id):
        post = PostModel.find_by_id(post_id)
        if post is None:
            return {'message': gettext("post_not_found")}, 404
        if post.user_id != get_jwt_identity():
            return {'message': gettext("post_not_author")}, 403
        post_visualizations = post.visualizations
        if post_visualizations:
            for visualization in post_visualizations:
                visualization.delete() 
        post.delete()
        return {'post_id_deleted': post_id, 'message': gettext("post_deleted")}, 200
    
    # get a post by id
    @jwt_required()
    def get(self, post_id):
        post = PostModel.find_by_id(post_id)
        if post is None:
            return {'message': gettext("post_not_found")}, 404
        return post_schema.dump(post), 200

####################### Operations with visualizations (One / All) ###############################
class PostAllVisualizationsResource(Resource):
    # get a post's visualizations ()
    @jwt_required()
    def get(self, post_id):
        post = PostModel.find_by_id(post_id)
        if post is None:
            return {'message': gettext("post_not_found")}, 404
        visualizations = post.visualizations
        return visualization_list_schema.dump(visualizations), 200
    
    # Delete all visualizations in a post
    @jwt_required()
    def delete(self, post_id):
        post = PostModel.find_by_id(post_id)
        if post is None:
            return {'message': gettext("post_not_found")}, 404
        visualizations = post.visualizations
        if len(visualizations) == 0:
            return {'message': gettext("post_visualizations_not_found")}, 404
        for visualization in visualizations:
            visualization.delete()
        return {'message': gettext("post_visualizations_deleted")}, 200

class PostListResource(Resource):
    # get all posts (ADMIN ONLY)
    def get(self):
        posts = PostModel.find_all()
        return post_list_schema.dump(posts), 200
        
    # delete all posts (ADMIN ONLY)
    def delete(self):
        posts = PostModel.find_all()
        if not posts:
            return {"message": gettext("posts_not_found")}, 404
        for post in posts:
            post.delete()
        return {'message': gettext("posts_deleted")}, 200
    
