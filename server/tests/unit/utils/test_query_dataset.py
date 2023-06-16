import unittest
from unittest.mock import MagicMock, patch
from resources.utils.query_dataset import get_dataset_labels, get_dataset_unique_column_values

class TestQueryDatasetFunctions(unittest.TestCase):
    def test_get_dataset_labels(self):
        expected_output = ['field1', 'field2', 'field3']

        # Mock the BigQuery client.get_table() method and the schema property
        with patch('resources.utils.query_dataset.client.get_table') as mock_get_table:
            mock_schema = [MagicMock(), MagicMock(), MagicMock()]
            for idx, field_name in enumerate(expected_output):
                mock_schema[idx].name = field_name
            mock_get_table.return_value.schema = mock_schema

            result = get_dataset_labels()
            self.assertEqual(result, expected_output)

    def test_get_dataset_unique_column_values(self):
        column_name = 'field1'
        expected_output = ['value1', 'value2', 'value3']

        # Mock the BigQuery client.query() method and its result() method
        with patch('resources.utils.query_dataset.client.query') as mock_query:
            # Replace the mocked result with your expected BigQuery result
            mock_result = [MagicMock(), MagicMock(), MagicMock()]
            for idx, value in enumerate(expected_output):
                mock_result[idx].__getitem__.return_value = value
            mock_query.return_value.result.return_value = mock_result

            result = get_dataset_unique_column_values(column_name)
            self.assertEqual(result, expected_output)