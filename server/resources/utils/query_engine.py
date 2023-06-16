from google.cloud import bigquery
import json

import ast

# Setup parameters
project_id = "yhcr-prd-phm-bia-core"
table_id = "CB_1937_IB.social_care_all_demographic_contact_visit_filtered" # table in my dataset

client = bigquery.Client(project=project_id)

def parse_input_string(parameters_string):
    # Replace single quotes with double quotes to ensure valid JSON
    parameters_string = parameters_string.replace("'", '"')
    # Parse the JSON string
    parameters_list = json.loads(parameters_string)
    # Initialize an empty dictionary for input_dict
    input_dict = {}
    # Iterate through the list of parameters
    for parameter in parameters_list:
        field_name = parameter['condition-field-name']
        field_type = parameter['condition-field-type']
        field_values = parameter['condition-values']
        # Add the field name to the input_dict if not already present
        if field_name not in input_dict:
            input_dict[field_name] = []
        # Append the parameter to the input_dict
        input_dict[field_name].append({
            'condition-type': field_type,
            'condition-values': field_values
        })
    return input_dict

def generate_query_string(dimension, input_dict):
    where_conditions = []
    for field, conditions in input_dict.items():
        for condition in conditions:
            if condition['condition-type'] == 'multi-select-text' or condition['condition-type'] == 'multi-select-number':
                # Check if None is in condition-values and remove it
                null_condition = None in condition['condition-values']
                if null_condition:
                    condition['condition-values'].remove(None)
                # If there are any other conditions left, construct the IN statement
                if condition['condition-values']:
                    if condition['condition-type'] == 'multi-select-text':
                        values = ', '.join([f"'{v}'" for v in condition['condition-values']])
                    else: # 'multi-select-number'
                        values = ', '.join([f"{v}" for v in condition['condition-values']])
                    in_condition = f"{field} IN ({values})"
                    # If null_condition is true, construct the IS NULL OR IN statement
                    if null_condition:
                        in_condition = f"({field} IS NULL OR {in_condition})"
                    where_conditions.append(in_condition)
                # If there are no other conditions left, but null_condition is true, construct the IS NULL statement
                elif null_condition:
                    where_conditions.append(f"{field} IS NULL")
            elif condition['condition-type'] == 'range-slider':
                min_value, max_value = sorted(condition['condition-values'])
                where_conditions.append(f"{field} BETWEEN {min_value} AND {max_value}")
            # Add more condition types as needed
    where_clause = ''
    if where_conditions:
        where_clause = f"WHERE {' AND '.join(where_conditions)}"
    query = f"""
    SELECT {dimension}, COUNT(distinct person_id) as head_count
    FROM `{table_id}`
    {where_clause}
    GROUP BY {dimension}
    ORDER BY head_count DESC
    LIMIT 10
    """
    return query

def get_bigquery_data(dimension, input_dict):
    query_string = generate_query_string(dimension, input_dict)
    print('---------------Query string--------------------')
    print(query_string)
    print('-----------------------------------')
    query_job = client.query(query_string)
    results = query_job.result()
    data = []
    for row in results:
        data.append({dimension: row[dimension], "head_count": row["head_count"]})
    return data

def extract_labels_and_data(data, dimension):
    labels = [entry[dimension] for entry in data]
    data = [entry["head_count"] for entry in data]
    return labels, data