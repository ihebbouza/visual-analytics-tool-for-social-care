from libs.strings import gettext
from models.user import UserModel
from models.post import PostModel
from models.visualization import VisualizationModel
from werkzeug.security import generate_password_hash
from schemas.schemas import PostSchema, VisualizationSchema
from tests.base_test import BaseTest
import json

class TestPostSystem(BaseTest):
    def create_user(self, username, email, password):
        user = UserModel(username=username, email=email, password=password)
        user.password = generate_password_hash(user.password)
        user.save()
        return user

    def login(self, username, password):
        return self.client.post('/login', json={"username": username, "password": password})

    def get_auth_headers(self, access_token):
        return {'Authorization': f'Bearer {access_token}'}

    def test_create_post(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_create_post", "email_create_post", "1234")
                response_login = self.login("test_create_post", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)

                response_create_post = client.post('/post', json={
                    "title": "title", 
                    "description": "description",
                }, headers=headers)
                self.assertEqual(response_create_post.status_code, 201)
                post_id = response_create_post.json['id']
                self.assertIsNotNone(PostModel.find_by_id(post_id))
    
    #################################
    # Create post while not logged in
    #################################
    def test_create_post_NOT_LOGGED_IN(self):
        with self.client as client:
            with self.app.app_context():
                response_create_post = client.post('/post', json={
                    "title": "title", 
                    "description": "description",
                })
                self.assertEqual(response_create_post.status_code, 401)
    

    def test_delete_post(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_delete_post", "email_delete_post", "1234")
                response_login = self.login("test_delete_post", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)

                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_delete_post = client.delete(f'/post/{post.id}', headers=headers)
                self.assertEqual(response_delete_post.status_code, 200)
                self.assertDictEqual({'message': gettext("post_deleted"), 'post_id_deleted': post.id}, json.loads(response_delete_post.data))
    
    #################################
    # Delete post while not logged in
    #################################
    def test_delete_post_NOT_LOGGED_IN(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_delete_post_NOT_LOGGED_IN", "email_delete_post_NOT_LOGGED_IN", "1234")
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_delete_post = client.delete(f'/post/{post.id}')
                self.assertEqual(response_delete_post.status_code, 401)
    
    #############################
    # Delete post while not author
    #############################
    def test_delete_post_NOT_AUTHOR(self):
        with self.client as client:
            with self.app.app_context():
                user_author = self.create_user("test_delete_post_author_AUTHOR", "email_delete_post_author_AUTHOR", "1234")
                user = self.create_user("test_delete_post_NOT_AUTHOR", "email_delete_post_NOT_AUTHOR", "1234")
                response_login = self.login("test_delete_post_NOT_AUTHOR", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)

                post = PostModel(title="title", description="description", user_id=user_author.id)
                post.save()
                response_delete_post = client.delete(f'/post/{post.id}', headers=headers)
                self.assertEqual(response_delete_post.status_code, 403)


    def test_update_post(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("username_update_post", "email_register_update_post", "1234")
                response_login = self.login("username_update_post", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_update_post = client.put(f'/post/{post.id}', json={
                    "title": "updated_title",
                    "description": "updated_description"
                }, headers=headers)
                self.assertEqual(response_update_post.status_code, 200)
                updated_post = PostModel.find_by_id(post.id)
                self.assertEqual(updated_post.title, "updated_title")
                self.assertEqual(updated_post.description, "updated_description")
                expected_result = PostSchema().dump(post)
                self.assertDictEqual(expected_result, json.loads(response_update_post.data))

    #################################
    # Update post while not author
    #################################
    def test_update_post_NOT_AUTHOR(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("username_update_post_NOT_AUTHOR", "email_register_update_post_NOT_AUTHOR", "1234")
                
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_update_post = client.put(f'/post/{post.id}', json={
                    "title": "updated_title",
                    "description": "updated_description"
                })
                self.assertEqual(response_update_post.status_code, 401)

    def test_get_post(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_get_post", "email_get_post", "1234")
                response_login = self.login("test_get_post", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                response_get_post = client.get(f'/post/{post.id}', headers=headers)
                self.assertEqual(response_get_post.status_code, 200)
                expected_result = PostSchema().dump(post)
                self.assertDictEqual(expected_result, json.loads(response_get_post.data))

    def test_get_all_posts(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_get_all_posts_NOT_LOGGED_IN", "email_get_all_posts_NOT_LOGGED_IN", "1234")
                response_login = self.login("test_get_all_posts_NOT_LOGGED_IN", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post1 = PostModel(title="title1", description="description1", user_id=user.id)
                post1.save()
                post2 = PostModel(title="title2", description="description2", user_id=user.id)
                post2.save()
                response_get_all_posts = client.get('/posts', headers=headers)
                self.assertEqual(response_get_all_posts.status_code, 200)
                expected_result = PostSchema(many=True).dump([post1, post2])
                self.assertListEqual(expected_result, json.loads(response_get_all_posts.data))
    
    ###################################
    # get all posts while not logged in => USeful for debugging so pass
    ###################################
    def test_get_all_posts_NOT_LOGGED_IN(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_get_all_posts_NOT_LOGGED_IN", "email_get_all_posts_NOT_LOGGED_IN", "1234")
                post1 = PostModel(title="title1", description="description1", user_id=user.id)
                post1.save()
                post2 = PostModel(title="title2", description="description2", user_id=user.id)
                post2.save()
                response_get_all_posts = client.get('/posts')
                self.assertEqual(response_get_all_posts.status_code, 200)
                expected_result = PostSchema(many=True).dump([post1, post2])
                self.assertListEqual(expected_result, json.loads(response_get_all_posts.data))

    def test_get_post_visualizations(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_get_post_visualizations", "email_get_post_visualizations", "1234")
                response_login = self.login("test_get_post_visualizations", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                # Add visualizations to the post
                visualization1 = VisualizationModel(
                    title="title",
                    type="type", 
                    description="description", 
                    dimension="dimension", 
                    parameters="parameters", 
                    post_id=post.id,
                    user_id=user.id
                )
                visualization1.save()
                visualization2 = VisualizationModel(
                    title="title",
                    type="type",  
                    description="description", 
                    dimension="dimension", 
                    parameters="parameters", 
                    post_id=post.id,
                    user_id=user.id
                )
                visualization2.save()
                response_get_post_visualizations = client.get(f'/post/{post.id}/visualizations', headers=headers)
                self.assertEqual(response_get_post_visualizations.status_code, 200)
                expected_result = VisualizationSchema(many=True).dump([visualization1, visualization2])
                self.assertListEqual(expected_result, json.loads(response_get_post_visualizations.data))

    #################################################
    # get all post visualizations while not logged in => useful so pass
    #################################################
    def test_get_post_visualizations_NOT_LOGGED_IN(self):
        with self.client as client:
            with self.app.app_context():
                user = self.create_user("test_get_post_visualizations", "email_get_post_visualizations", "1234")
                response_login = self.login("test_get_post_visualizations", "1234")
                access_token = response_login.json['access_token']
                headers = self.get_auth_headers(access_token)
                post = PostModel(title="title", description="description", user_id=user.id)
                post.save()
                # Add visualizations to the post
                visualization1 = VisualizationModel(
                    title="title",
                    type="type", 
                    description="description", 
                    dimension="dimension", 
                    parameters="parameters", 
                    post_id=post.id,
                    user_id=user.id
                )
                visualization1.save()
                visualization2 = VisualizationModel(
                    title="title",
                    type="type",  
                    description="description", 
                    dimension="dimension", 
                    parameters="parameters", 
                    post_id=post.id,
                    user_id=user.id
                )
                visualization2.save()
                response_get_post_visualizations = client.get(f'/post/{post.id}/visualizations', headers=headers)
                self.assertEqual(response_get_post_visualizations.status_code, 200)
                expected_result = VisualizationSchema(many=True).dump([visualization1, visualization2])
                self.assertListEqual(expected_result, json.loads(response_get_post_visualizations.data))