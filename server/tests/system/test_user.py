from libs.strings import gettext
from models.user import UserModel
from tests.base_test import BaseTest
import json


class TestUserSystem(BaseTest):
    def test_register_user(self):
        with self.client as client:
            with self.app.app_context():
                response = client.post('/register', json={
                    "username": "test_new", 
                    "email": "email_new",
                    "password": "1234"
                })
                self.assertEqual(response.status_code, 201)
                self.assertIsNotNone(UserModel.find_by_username('test_new'))
    
    def test_register_and_login_user(self):
        with self.client as client:
            with self.app.app_context():
                client.post('/register', json={
                    "username": "test_login", 
                    "email": "email",
                    "password": "1234"
                })
                response = client.post('/login', json={
                    "username": "test_login", 
                    "password": "1234"
                })
                self.assertIn('access_token', json.loads(response.data).keys())
                

    def test_register_duplicate_user(self):
        with self.client as client:
            with self.app.app_context():
                client.post('/register', json={
                    "username": "test_register", 
                    "email": "email_register",
                    "password": "1234"
                })
                response = client.post('/register', json={
                    "username": "test_register", 
                    "email": "email_register",
                    "password": "1234"
                })
                self.assertEqual(response.status_code, 400)
                self.assertDictEqual({'message': gettext("username_or_email_exists")}, json.loads(response.data))