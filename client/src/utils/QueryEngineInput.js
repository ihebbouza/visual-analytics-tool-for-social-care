export const convertInputValues = (values) => {
    const fieldMapping = {
        postcode: {
            "field-name": "postcode",
            "condition-type": "multi-select-text",
        },
        age: {
            "field-name": "age",
            "condition-type": "range-slider",
        },
        year_of_death: {
            "field-name": "year_of_death",
            "condition-type": "multi-select-number",
        },
        gender: {
            "field-name": "gender",
            "condition-type": "multi-select-text",
        },
        ethnicity: {
            "field-name": "ethnicity",
            "condition-type": "multi-select-text",
        },
        contact_age: {
            "field-name": "contact_age",
            "condition-type": "range-slider",
        },
        contact_source: {
            "field-name": "contact_source",
            "condition-type": "multi-select-text",
        },
        contact_date: {
            "field-name": "contact_date",
            "condition-type": "multi-select-text",
        },
        contact_route: {
            "field-name": "contact_route",
            "condition-type": "multi-select-text",
        },
        contact_reason: {
            "field-name": "contact_reason",
            "condition-type": "multi-select-text",
        },
        contact_outcome: {
            "field-name": "contact_outcome",
            "condition-type": "multi-select-text",
        },
        visit_occurrence: {
            "field-name": "visit_occurrence",
            "condition-type": "multi-select-text",
        },
        months_between_contact_and_visit: {
            "field-name": "months_between_contact_and_visit",
            "condition-type": "multi-select-number",
        },
        // Add other input fields here
    };

    const parameters = Object.entries(values).reduce((acc, [key, value]) => {
        if (fieldMapping[key]) {
            const { "field-name": fieldName, "condition-type": conditionType } = fieldMapping[key];
            acc.push({
                "condition-field-name": fieldName,
                "condition-field-type": conditionType,
                "condition-values": value,
            });
        }
        return acc;
    }, []);

    return {
        title: values.title,
        description: values.description,
        type: values.type,
        dimension: values.dimension,
        parameters: JSON.stringify(parameters),
    };
};