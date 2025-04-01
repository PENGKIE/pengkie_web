
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    const { id, oldFieldName, newFieldName } = input[0];

    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';
    if (oldFieldName == undefined) throw 'not found oldFieldName';
    if (typeof oldFieldName !== 'string') throw 'oldFieldName must be string';
    if (newFieldName == undefined) throw 'not found newFieldName';
    if (typeof newFieldName !== 'string') throw 'newFieldName must be string';
    if (newFieldName.length < 1) throw 'newFieldName must be more than 1 character';
    if (newFieldName.length > 50) throw 'newFieldName must be less than 50 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const now = new Date().getTime();

    const schemaObj = await schemaCol.findOne({
        _id: new BSON.ObjectId(id)
    });
    if (!schemaObj) throw 'not found schema';

    const data = schemaObj.data;
    if (!data[oldFieldName]) throw 'not found fieldName';

    const isExist = data[newFieldName];
    if (isExist) throw 'newFieldName is exist';

    data[newFieldName] = data[oldFieldName];
    delete data[oldFieldName];
    await schemaCol.updateOne({
        _id: new BSON.ObjectId(id)
    }, {
        $set: {
            data,
            updateAt: now
        }
    });

}