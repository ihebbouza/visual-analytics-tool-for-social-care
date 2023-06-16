import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from marshmallow import ValidationError
import requests
from flask_cors import CORS

from db import db
from ma import ma
from resources.user import TokenRefreshResource, UserRegisterResource, UserLoginResource, UserResource, UserListResource, UserAllPostsResource, UserAllVisualizationsResource
from resources.post import PostResource, PostListResource, PostAllVisualizationsResource
from resources.visualization import VisualizationResource, VisualizationListResource, VisualizationDataResource
from resources.dataset import DatasetLabelsResource, DatasetValuesResource



jwt = JWTManager()
migrate = Migrate()
api = Api()

def create_app(config=None):
    app = Flask(__name__)
    CORS(app)
    if config:
        app.config.from_object(config)
    load_dotenv(".env")
    app.config["DEBUG"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URI", "sqlite:///data.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.secret_key = "jose"
    
    # User related operations
    api.add_resource(UserRegisterResource, "/register", endpoint="userregister")
    api.add_resource(UserLoginResource, "/login", endpoint="userlogin")
    api.add_resource(UserResource, "/user/<int:user_id>", endpoint="user")
    api.add_resource(UserListResource, "/users", endpoint="userlist")
    api.add_resource(UserAllPostsResource, "/user/<int:user_id>/posts", endpoint="userallposts")
    api.add_resource(UserAllVisualizationsResource, "/user/<int:user_id>/visualizations", endpoint="userallvisualizations")

    # refreshing the token
    api.add_resource(TokenRefreshResource, "/token/refresh", endpoint="tokenrefresh")
    
    # Post related operations
    api.add_resource(PostResource, "/post", "/post/<int:post_id>", endpoint="post")
    api.add_resource(PostListResource, "/posts", endpoint="postlist")
    api.add_resource(PostAllVisualizationsResource, "/post/<int:post_id>/visualizations", endpoint="postallvisualizations")

    # Visualization related operations
    api.add_resource(VisualizationResource, "/visualization/post/<int:post_id>", "/visualization/<int:visualization_id>", endpoint="visualizationcreate")
    api.add_resource(VisualizationListResource, "/visualizations", endpoint="visualizationlist")
    api.add_resource(VisualizationDataResource, "/visualization/<int:visualization_id>/data", "/visualization/data", endpoint="visualizationdata")

    
    # Dataset related operations
    api.add_resource(DatasetLabelsResource, "/dataset/labels", endpoint="visualizationlabels")
    api.add_resource(DatasetValuesResource, "/dataset/<string:column_name>/values", endpoint="visualizationvalues")
    
    api.init_app(app)
    
    jwt.init_app(app)
    migrate.init_app(app, db)

    @app.errorhandler(ValidationError)
    def handle_marshmallow_validation(err):
        print("hello")
        return jsonify(err.messages), 400

    db.init_app(app)
    ma.init_app(app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)