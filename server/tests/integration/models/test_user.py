from tests.base_test import BaseTest
from models.post import PostModel
from models.visualization import VisualizationModel
from models.user import UserModel
import time



class TestUserIntegrationModel(BaseTest):
    def test_crud(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_crud',
                password='test',
                email = f'email_crud'
            )
            self.assertIsNone(UserModel.find_by_id(user.id))
            user.save()
            self.assertIsNotNone(UserModel.find_by_id(user.id))
            user.delete()
            self.assertIsNone(UserModel.find_by_id(user.id))
    
    # testing relationship to posts
    def test_posts_relationship(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_posts_rel',
                password='test',
                email = f'email_posts_rel'
            )
            user.save()
            post = PostModel(
                title=f'title',
                description=f'description',
                user_id=user.id
            )
            post.save()
            self.assertIsNotNone(PostModel.find_by_id(post.id))
            self.assertEqual(user.posts[0].title, "title")
            self.assertEqual(user.posts[0].description, "description")

    # testing relationship to visualizations
    def test_visualizations_relationship(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_visualizations_rel',
                password='test',
                email = f'email_visualizations_rel'
            )
            user.save()
            post = PostModel(
                title=f'title',
                description=f'description',
                user_id=user.id
            )
            post.save()
            visualization = VisualizationModel(
                title='title',
                type='type',
                description='description',
                dimension='dimension',
                parameters='parameters',
                user_id = user.id,
                post_id = post.id
            )
            visualization.save()
            self.assertIsNotNone(VisualizationModel.find_by_id(visualization.id))
            self.assertEqual(user.visualizations[0].title, "title")
            self.assertEqual(user.visualizations[0].type, "type")
            self.assertEqual(user.visualizations[0].description, "description")
            self.assertEqual(user.visualizations[0].dimension, "dimension")
            self.assertEqual(user.visualizations[0].parameters, "parameters")
            self.assertEqual(user.visualizations[0].description, "description")