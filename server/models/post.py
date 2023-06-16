from db import db
from typing import List

class PostModel(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), nullable=False)
    description = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    visualizations = db.relationship('VisualizationModel', backref='post', lazy=True)

    def json(self):
        return {'title': self.title, 'description': self.description}
    
    @classmethod
    def find_by_id(cls, _id: int) -> "PostModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["PostModel"]:
        return cls.query.all()
    
    
    def save(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()