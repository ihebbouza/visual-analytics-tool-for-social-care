from unittest import TestCase
from app import create_app, db
from testing_config import TestingConfig

class BaseTest(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app(TestingConfig)
        cls.app.testing = True
        cls.client = cls.app.test_client()
        with cls.app.app_context():
            db.create_all()

    def setUp(self):
        with self.app.app_context():
            self.truncate_all_tables()

    def tearDown(self):
        with self.app.app_context():
            self.truncate_all_tables()

    @classmethod
    def tearDownClass(cls):
        with cls.app.app_context():
            db.drop_all()

    def truncate_all_tables(self):
        # Truncate all tables here
        meta = db.metadata
        for table in reversed(meta.sorted_tables):
            db.session.execute(table.delete())
        db.session.commit()