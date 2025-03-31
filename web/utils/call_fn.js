
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
        default:
            throw new Error('Function not found');
    }
}