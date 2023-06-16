from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    posts = fields.Nested('PostSchema', many=True, exclude=('user',))
    visualizations = fields.Nested('VisualizationSchema', many=True, exclude=('user',))

class PostSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    user_id = fields.Integer(required=True, load_only=True)
    user = fields.Nested('UserSchema', exclude=('posts', 'visualizations'))
    visualizations = fields.Nested('VisualizationSchema', many=True, exclude=('post',))

class VisualizationSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    type = fields.String(required=True)
    dimension = fields.String(required=True)
    parameters = fields.String(required=True)
    user_id = fields.Integer(required=True, load_only=True)
    user = fields.Nested('UserSchema', exclude=('posts', 'visualizations'))
    post_id = fields.Integer(required=True, load_only=True)
    post = fields.Nested('PostSchema', exclude=('user', 'visualizations'))
