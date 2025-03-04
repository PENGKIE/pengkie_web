
let _client;
const { MongoClient , ObjectId } = require('mongodb');

module.exports = {
    connectDB: async function () {
        if (!_client) {
            const uri = require('../my_env/my_env.json').MONGO_URL_DOC;
            _client = new MongoClient(uri);
            await _client.connect();
        }
        return _client;
    },

    newObjectId: function (id) {
        return new ObjectId(id)
    }
}