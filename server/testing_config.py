import os

class TestingConfig:
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://guzitldy:nLTyzNLYu8-S5jIsxCtBvUln7pQb3Hkp@mouse.db.elephantsql.com/guzitldy'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "secret-key"