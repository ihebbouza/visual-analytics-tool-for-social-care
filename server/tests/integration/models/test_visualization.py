from tests.base_test import BaseTest
from models.post import PostModel
from models.visualization import VisualizationModel
from models.user import UserModel

class TestVisualizationIntegrationModel(BaseTest):
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
            post.save()
            # Visualization
            visualization = VisualizationModel(
                title='test title',
                description='test content',
                dimension='test dimension',
                type='test type',
                parameters='test parameters',
                post_id=post.id,
                user_id=user.id
            )
            self.assertIsNone(VisualizationModel.find_by_id(visualization.id))
            visualization.save()
            self.assertIsNotNone(VisualizationModel.find_by_id(visualization.id))
            visualization.delete()
            self.assertIsNone(VisualizationModel.find_by_id(visualization.id))
    
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
            post.save()
            visualization = VisualizationModel(
                title='test title',
                description='test content',
                dimension='test dimension',
                type='test type',
                parameters='test parameters',
                post_id=post.id,
                user_id=user.id
            )
            self.assertIsNone(VisualizationModel.find_by_id(visualization.id))
            visualization.save()
            self.assertEqual(visualization.user.username, user.username)
            self.assertEqual(visualization.user.password, user.password)
            self.assertEqual(visualization.user.email, user.email)
    
    # test relationship to post
    def test_post_relationship(self):
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
                user_id = user.id,
                post_id = post.id
            )
            visualization.save()
            self.assertEqual(visualization.post.title, post.title)
            self.assertEqual(visualization.post.description, post.description)
            self.assertEqual(visualization.post.user_id, post.user_id)
