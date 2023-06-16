from db import db
from typing import List

class VisualizationModel(db.Model):
    __tablename__ = 'visualizations'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), nullable=False)
    description = db.Column(db.String(), nullable=False)
    type = db.Column(db.String(60), nullable=False)
    dimension = db.Column(db.String(), nullable=False)
    parameters = db.Column(db.String(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    @classmethod
    def find_by_id(cls, _id: int) -> "VisualizationModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["VisualizationModel"]:
        return cls.query.all()
    
    def save(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()