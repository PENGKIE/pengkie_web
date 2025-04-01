
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    const { id, fieldName } = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    if (fieldName == undefined) throw 'not found fieldName';
    if (typeof fieldName !== 'string') throw 'fieldName must be string';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const enumCol = db.collection("enum");

    const enumObj = await enumCol.findOne({
        _id: new BSON.ObjectId(id)
    });

    if (!enumObj) throw 'not found enum';

    const data = enumObj.data;
    if (!data[fieldName]) throw 'not found fieldName';

    delete data[fieldName];
    await enumCol.updateOne({
        _id: new BSON.ObjectId(id)
    }, {
        $set: {
            data,
            updateAt: new Date().getTime()
        }
    });
}