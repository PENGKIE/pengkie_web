
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let id = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const enumCol = db.collection("enum");

    await enumCol.deleteOne({
        _id: new BSON.ObjectId(id)
    });
}