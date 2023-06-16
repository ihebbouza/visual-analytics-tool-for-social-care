from db import db
from app import app, init_db


def create_database_tables():
    """
    This function initializes the database and creates all the tables.
    It should be run before starting the application for the first time.
    """
    try:
        with app.app_context():
            init_db()
            db.create_all()
        print("Database tables created successfully.")
    except Exception as e:
        print(f"Error creating database tables: {e}")


if __name__ == "__main__":
    create_database_tables()