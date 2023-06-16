from libs.strings import gettext # For the error messages
from flask import request, jsonify
from flask_restful import Resource
from .utils.query_dataset import get_dataset_labels, get_dataset_unique_column_values

class DatasetLabelsResource(Resource):
    def get(self):
        try:
            labels = get_dataset_labels()
            return jsonify(labels)
        except Exception as err:
            return {'error': str(err)}, 400

class DatasetValuesResource(Resource):
    def get(self, column_name):
        try:
            values = get_dataset_unique_column_values(column_name)
            return jsonify(values)
        except Exception as err:
            return {'error': str(err)}, 400
