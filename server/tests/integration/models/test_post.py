from tests.base_test import BaseTest
from models.post import PostModel
from models.visualization import VisualizationModel
from models.user import UserModel
import time



class TestPostIntegrationModel(BaseTest):
    def test_crud(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_crud',
                password='test',
                email = f'email_crud'
            )
            user.save()
            post = PostModel(
                title='test title',
                description='test content',
                user_id=user.id
            )
            self.assertIsNone(PostModel.find_by_id(post.id))
            post.save()
            self.assertIsNotNone(PostModel.find_by_id(post.id))
            post.delete()
            self.assertIsNone(PostModel.find_by_id(post.id))
    
    # test relationship to user
    def test_user_relationship(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_posts',
                password='test',
                email = f'email_posts'
            )
            user.save()
            post = PostModel(
                title='test title',
                description='test content',
                user_id=user.id
            )
            self.assertIsNone(PostModel.find_by_id(post.id))
            post.save()
            self.assertEqual(post.user.username, user.username)
            self.assertEqual(post.user.password, user.password)
            self.assertEqual(post.user.email, user.email)
    
    # test relationship to visualization
    def test_visualization_relationship(self):
        with self.app.app_context():
            user = UserModel(
                username=f'username_visualizations',
                password='test',
                email = f'email_visualizations'
            )
            user.save()
            post = PostModel(
                title='test title',
                description='test content',
                user_id=user.id
            )
            post.save()
            visualization = VisualizationModel(
                title='test title',
                description='test content',
                dimension='test dimension',
                type='test type',
                parameters='test parameters',
                user_id=user.id,
                post_id = post.id
            )
            visualization.save()
            self.assertEqual(post.visualizations[0].title, visualization.title)
            self.assertEqual(post.visualizations[0].description, visualization.description)
            self.assertEqual(post.visualizations[0].dimension, visualization.dimension)
            self.assertEqual(post.visualizations[0].type, visualization.type)
            self.assertEqual(post.visualizations[0].parameters, visualization.parameters)