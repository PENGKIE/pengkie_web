
module.exports = (name, ...args) => {
    switch (name) {
        case 'testGetData':
            return require('../functions/test_get_data.js')(...args);
        default:
            throw new Error('Function not found');
    }
}