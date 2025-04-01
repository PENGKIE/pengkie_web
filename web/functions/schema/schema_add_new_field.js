
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    const { id, fieldName, fieldType, isArray, ref } = input[0];

    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    if (fieldName == undefined) throw 'not found fieldName';
    if (typeof fieldName !== 'string') throw 'fieldName must be string';
    if (fieldName.length < 1) throw 'fieldName must be more than 1 character';
    if (fieldName.length > 50) throw 'fieldName must be less than 50 character';

    if (fieldType == undefined) throw 'not found fieldType';
    if (typeof fieldType !== 'string') throw 'fieldType must be string';

    switch (fieldType) {
        case 'String':
        case 'Float':
        case 'Boolean':
        case 'ObjectId':
            if (ref === undefined) {
                break;
            }
            if (ref === null) {
                break;
            }
            throw 'ref must be null';
        case 'Object':
        case 'Enum':
            if (ref == undefined) throw 'not found ref';
            if (typeof ref !== 'string') throw 'ref must be string';
            if (ref.length !== 24) throw 'ref must be 24 character';
            break;
        default:
            throw 'fieldType is not valid';
    }

    if (isArray == undefined) throw 'not found isArray';
    if (typeof isArray !== 'boolean') throw 'isArray must be boolean';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const now = new Date().getTime();

    // check fieldName is exist
    const schemaObj = await schemaCol.findOne({
        _id: new BSON.ObjectId(id)
    });

    if (!schemaObj) throw 'not found schema';

    const data = schemaObj.data;
    if (data[fieldName]) throw 'fieldName is exist';

    const field = {
        type: fieldType,
        ref: ref || null,
        isArray: isArray,
        descriptions: []
    };

    data[fieldName] = field;

    await schemaCol.updateOne({
        _id: new BSON.ObjectId(id)
    }, {
        $set: {
            data,
            updateAt: now
        }
    });
}