

const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let { id, fieldName, descriptions } = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    if (fieldName == undefined) throw 'not found fieldName';
    if (typeof fieldName !== 'string') throw 'fieldName must be string';
    if (descriptions == undefined) throw 'not found descriptions';
    if (!Array.isArray(descriptions)) throw 'descriptions must be array';
    if (descriptions.length > 50) throw 'descriptions must be less than 50 length';

    descriptions = descriptions.filter((item) => {
        if (typeof item !== 'string') return false;
        if (item.length < 1) return false;
        if (item.length > 500) throw 'descriptions must be less than 500 length';
        return true;
    }
    );

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const now = new Date().getTime();
    const schemaObj = await schemaCol.findOne({
        _id: new BSON.ObjectId(id)
    });

    if (!schemaObj) throw 'not found schema';
    const data = schemaObj.data;

    if (!data[fieldName]) throw 'not found fieldName';
    if (data[fieldName].descriptions) throw 'descriptions is exist';
    data[fieldName].descriptions = descriptions;

    await schemaCol.updateOne({
        _id: new BSON.ObjectId(id)
    }, {
        $set: {
            data,
            updateAt: now
        }
    });
}