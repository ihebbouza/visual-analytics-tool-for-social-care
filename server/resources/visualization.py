from libs.strings import gettext # For the error messages
from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from .utils.query_engine import parse_input_string, get_bigquery_data, extract_labels_and_data

from models.visualization import VisualizationModel
from schemas.schemas import VisualizationSchema

visualization_schema = VisualizationSchema()
visualization_list_schema = VisualizationSchema(many=True)

class VisualizationResource(Resource):
    # create a visualization with post_id (LOGGED IN)
    @jwt_required()
    def post(self, post_id):
        data = request.get_json()
        print(data)
        title = data.get('title')
        description = data.get('description')
        type = data.get('type')
        dimension = data.get('dimension')
        parameters = data.get('parameters')
        user_id = get_jwt_identity()
        visualization = VisualizationModel (
            title=title,
            description=description,
            type=type,
            dimension = dimension,
            parameters=parameters,
            user_id=user_id,
            post_id=post_id
        )
        visualization.save()
        print(visualization)
        return visualization_schema.dump(visualization), 201
    
    # delete a visualization with visualization_id (LOGGED IN)
    @jwt_required()
    def delete(self, visualization_id):
        visualization = VisualizationModel.find_by_id(visualization_id)
        if visualization is None:
            return {'message': gettext("visualization_not_found")}, 404
        if visualization.user_id != get_jwt_identity():
            return {'message': gettext("visualization_not_author")}, 403
        visualization.delete()
        return {'message': gettext("visualization_deleted")}, 200
    
    # get a visualization with visualization_id (LOGGED IN)
    @jwt_required()
    def get(self, visualization_id):
        visualization = VisualizationModel.find_by_id(visualization_id)
        if visualization is None:
            return {'message': gettext("visualization_not_found")}, 404
        return visualization_schema.dump(visualization), 200
    
    # update a visualization with visualization_id (LOGGED IN)
    @jwt_required()
    def put(self, visualization_id):
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        type = data.get('type')
        dimension = data.get('dimension')
        parameters = data.get('parameters')
        visualization = VisualizationModel.find_by_id(visualization_id)
        if visualization is None:
            return {'message': gettext("visualization_not_found")}, 404
        if visualization.user_id!= get_jwt_identity():
            return {'message': gettext("visualization_not_author")}, 403
        visualization.title = title
        visualization.description = description
        visualization.type = type
        visualization.dimension = dimension
        visualization.parameters = parameters
        visualization.save()
        return visualization_schema.dump(visualization), 200

######## Visualization data from BigQuery ##########
class VisualizationDataResource(Resource):
    # get all data from the dataset according to the visualization_id and parameters
    def get(self, visualization_id):
        visualization = VisualizationModel.find_by_id(visualization_id)
        if visualization is None:
            return {'message': gettext("visualization_not_found")}, 404
        # Getting the string of parameters
        parameters = visualization.parameters 
        dimension = visualization.dimension
        # Query engine !!
        parsed_input = parse_input_string(parameters)
        # print('------------------Dimension------------------------')
        # print(dimension)
        # print('------------------------------------------')
        # print('------------------Parsed input------------------------')
        # print(parsed_input)
        # print('------------------------------------------')
        data = get_bigquery_data(dimension, parsed_input)
        # print('------------------Data------------------------')
        # print(data)
        # print('------------------------------------------')
        labels, data_values = extract_labels_and_data(data, dimension)
        # print('------------------labels------------------------')
        # print(labels)
        # print('------------------------------------------')
        # print('------------------data_values------------------------')
        # print(data_values)
        # print('------------------------------------------')
        return jsonify({"labels": labels, "data": data_values})
    
    def post(self):
        # Get the input data from the request body
        input_data = request.get_json()
        # Check if the 'parameters' key is present in the input data
        if 'parameters' not in input_data:
            return {'message': 'Missing "parameters" in the request body.'}, 400
        # Get the parameters string from the input data
        parameters = input_data['parameters']
        dimension = input_data.get('dimension', 'your_default_dimension')  # Replace 'your_default_dimension' with the appropriate default value
        # Query engine !!
        parsed_input = parse_input_string(parameters)
        print('------------------Dimension------------------------')
        print(dimension)
        print('------------------------------------------')
        print('------------------Parsed input------------------------')
        print(parsed_input)
        print('------------------------------------------')
        data = get_bigquery_data(dimension, parsed_input)
        print('------------------Data------------------------')
        print(data)
        print('------------------------------------------')
        labels, data_values = extract_labels_and_data(data, dimension)
        print('------------------labels------------------------')
        print(labels)
        print('------------------------------------------')
        print('------------------data_values------------------------')
        print(data_values)
        print('------------------------------------------')
        return jsonify({"labels": labels, "data": data_values})

class VisualizationListResource(Resource):
    # get all visualizations (ADMIN)
    def get(self):
        visualizations = VisualizationModel.find_all()
        return visualization_list_schema.dump(visualizations), 200
    
    # delete all visualizations (ADMIN)
    def delete(self):
        visualizations = VisualizationModel.find_all()
        if visualizations is None:
            return {'message': gettext("visualizations_not_found")}, 404
        for visualization in visualizations:
            visualization.delete()
        return {'message': gettext("visualization_deleted")}, 200
    
