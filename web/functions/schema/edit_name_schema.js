
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    const { id, name } = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    if (name == undefined) throw 'not found name';
    if (typeof name !== 'string') throw 'name must be string';
    if (name.length < 1) throw 'name must be more than 1 character';
    if (name.length > 50) throw 'name must be less than 50 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const isExist = await schemaCol.findOne({
        name: name,
        _id: {
            $ne: new BSON.ObjectId(id)
        }
    });

    if (isExist) throw 'name is exist';
    const now = new Date().getTime();

    await schemaCol.updateOne({
        _id: new BSON.ObjectId(id)
    }, {
        $set: {
            name,
            updateAt: now
        }
    });
}