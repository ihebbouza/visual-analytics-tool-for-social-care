import unittest
from unittest.mock import MagicMock
from resources.utils.query_engine import parse_input_string, generate_query_string, get_bigquery_data, extract_labels_and_data

class TestQueryEngine(unittest.TestCase):

    def test_parse_input_string(self):
        parameters_string = '[{"condition-field-name": "field1", "condition-field-type": "multi-select-text", "condition-values": ["value1", "value2"]}]'
        expected_output = {
            'field1': [
                {
                    'condition-type': 'multi-select-text',
                    'condition-values': ['value1', 'value2']
                }
            ]
        }
        result = parse_input_string(parameters_string)
        self.assertEqual(result, expected_output)

    def test_generate_query_string(self):
        dimension = "field1"
        input_dict = {
            'field1': [
                {
                    'condition-type': 'multi-select-text',
                    'condition-values': ['value1', 'value2']
                }
            ]
        }
        expected_output = """
        SELECT field1, COUNT(distinct person_id) as head_count
        FROM `CB_1937_IB.social_care_all_demographic_contact_visit_filtered`
        WHERE field1 IN ('value1', 'value2')
        GROUP BY field1
        ORDER BY head_count DESC
        LIMIT 10
        """
        result = generate_query_string(dimension, input_dict)
        self.assertEqual(result.strip().replace("    ", ""), expected_output.strip().replace("    ", ""))

    def test_get_bigquery_data(self):
        dimension = "field1"
        input_dict = {
            'field1': [
                {
                    'condition-type': 'multi-select-text',
                    'condition-values': ['value1', 'value2']
                }
            ]
        }
        expected_output = [
            {'field1': 'value1', 'head_count': 10},
            {'field1': 'value2', 'head_count': 5}
        ]
        # Mock the BigQuery client.query() method and its result() method
        with unittest.mock.patch('resources.utils.query_engine.client.query') as mock_query:
            # Replace the mocked result with your expected BigQuery result
            mock_query.return_value.result.return_value = [
                {'field1': 'value1', 'head_count': 10},
                {'field1': 'value2', 'head_count': 5},
            ]

            result = get_bigquery_data(dimension, input_dict)
            self.assertEqual(result, expected_output)

    def test_extract_labels_and_data(self):
        data = [
            {'field1': 'value1', 'head_count': 10},
            {'field1': 'value2', 'head_count': 5}
        ]
        dimension = "field1"
        expected_labels = ['value1', 'value2']
        expected_data = [10, 5]

        labels, data = extract_labels_and_data(data, dimension)
        self.assertEqual(labels, expected_labels)
        self.assertEqual(data, expected_data)