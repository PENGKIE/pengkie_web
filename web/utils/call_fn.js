
module.exports = (name, ...args) => {
    switch (name) {
        case 'testGetData':
            return require('../functions/test_get_data.js')(...args);
        case 'getListDocument':
            return require('../functions/get_list_document.js')(...args);
        case 'getDocumentById':
            return require('../functions/get_document_by_id.js')(...args);
        case 'createAndUpdateDocument':
            return require('../functions/create_and_update_document.js')(...args);
        case 'cateForWeb':
            return require('../functions/cate_for_web.js')(...args);
        case 'getListLogging':
            return require('../functions/get_list_logging.js')(...args);
        case 'getPDPA':
            return require('../functions/get_pdpa.js')(...args);
        case 'getTerms':
            return require('../functions/get_terms.js')(...args);
        case 'getSchema':
            return require('../functions/schema/get_schema.js')(...args);
        case 'getSchemaById':
            return require('../functions/schema/get_schema_by_id.js')(...args);
        case 'createSchema':
            return require('../functions/schema/create_schema.js')(...args);
        case 'editIsMainSchema':
            return require('../functions/schema/edit_is_main_schema.js')(...args);
        case 'editNameSchema':
            return require('../functions/schema/edit_name_schema.js')(...args);
        case 'editDescriptionsSchema':
            return require('../functions/schema/edit_descriptions_schema.js')(...args);
        case 'addFieldSchema':
            return require('../functions/schema/schema_add_new_field.js')(...args);
        case 'editFieldNameSchema':
            return require('../functions/schema/edit_field_name_schema.js')(...args);
        case 'deleteFieldSchema':
            return require('../functions/schema/delete_field_schema.js')(...args);
        case 'editFieldTypeSchema':
            return require('../functions/schema/edit_type_field_schema.js')(...args);
        case 'editFieldDescriptionsSchema':
            return require('../functions/schema/edit_descriptions_field_schema.js')(...args);
        case 'getSchemasOrEnumsUsedInSchema':
            return require('../functions/schema/get_schemas_or_enum_used_another_schema.js')(...args);
        case 'getEnum':
            return require('../functions/schema/get_enum.js')(...args);
        case 'getEnumById':
            return require('../functions/schema/get_enum_by_id.js')(...args);
        case 'createEnum':
            return require('../functions/schema/create_enum.js')(...args);
        case 'editNameEnum':
            return require('../functions/schema/edit_name_enum.js')(...args);
        case 'editDescriptionsEnum':
            return require('../functions/schema/edit_descriptions_enum.js')(...args);
        case 'addFieldEnum':
            return require('../functions/schema/enum_add_new_field.js')(...args);
        case 'editFieldNameEnum':
            return require('../functions/schema/edit_field_name_enum.js')(...args);
        case 'deleteFieldEnum':
            return require('../functions/schema/delete_field_enum.js')(...args);
        case 'editFieldDescriptionsEnum':
            return require('../functions/schema/edit_descriptions_field_enum.js')(...args);
        default:
            throw new Error('Function not found');
    }
}