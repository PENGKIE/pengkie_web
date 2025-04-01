
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let id = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const schemas = await schemaCol.find({
        'data.ref': id
    }).toArray();

    if (schemas.length === 0) return [];

    return schemas.map((schema) => {
        return {
            id: schema._id.toString(),
            name: schema.name,
        }
    });
}