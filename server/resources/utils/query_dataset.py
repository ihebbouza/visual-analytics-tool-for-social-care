from google.cloud import bigquery
import json

import ast

# Setup parameters
project_id = "yhcr-prd-phm-bia-core"
table_id = "CB_1937_IB.social_care_all_demographic_contact_visit_filtered" # table in my dataset

client = bigquery.Client(project=project_id)

def get_dataset_labels():
    table = client.get_table(table_id)
    schema = table.schema
    labels = [field.name for field in schema]
    return labels

def get_dataset_unique_column_values(column_name):
    query = f"""
    SELECT DISTINCT {column_name}
    FROM `{table_id}`
    ORDER BY {column_name} ASC
    """
    query_job = client.query(query)
    results = query_job.result()
    column_values = [row[0] for row in results]
    return column_values