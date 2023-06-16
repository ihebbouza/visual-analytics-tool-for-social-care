from libs.strings import gettext
from models.user import UserModel
from models.post import PostModel
from models.visualization import VisualizationModel
from werkzeug.security import generate_password_hash
from schemas.schemas import PostSchema, VisualizationSchema
from tests.base_test import BaseTest
import json

class TestVisualizationSystem(BaseTest):
    def create_user(self, username, email, password):
        user = UserModel(username=username, email=email, password=password)
        user.password = generate_password_hash(user.password)
        user.save()
        return user

    def login(self, username, password):
        return self.client.post('/login', json={"username": username, "password": password})

    def get_auth_headers(self, access_token):
        return {'Authorization': f'Bearer {access_token}'}

    def test_create_visualization(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test", "test", "1234")
                response_login = self.login("test", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_create_visualization = client.post(f'/visualization/post/{post.id}', json={
                    "title": "title", 
                    "description": "description",
                    "type": "type",
                    "dimension": "dimension",
                    "parameters": "parameters",
                    "post_id": post.id
                }, headers=headers)
                self.assertEqual(response_create_visualization.status_code, 201)
                visualization_id = response_create_visualization.json['id']
                self.assertIsNotNone(VisualizationModel.find_by_id(visualization_id))
    
    def test_create_visualization_NOT_LOGGED_IN(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test", "test", "1234")
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_create_visualization = client.post(f'/visualization/post/{post.id}', json={
                    "title": "title", 
                    "description": "description",
                    "type": "type",
                    "dimension": "dimension",
                    "parameters": "parameters",
                    "post_id": post.id
                })
                self.assertEqual(response_create_visualization.status_code, 401)

    def test_delete_visualization(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test", "email", "1234")
                response_login = self.login("test", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                visualization = VisualizationModel(title="title", dimension="dimension", description="description", type="type", parameters="parameters", post_id=post.id, user_id=user.id)
                visualization.save()
                response_delete_visualization = client.delete(f'/visualization/{visualization.id}', headers=headers)
                self.assertEqual(response_delete_visualization.status_code, 200)
