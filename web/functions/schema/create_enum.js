
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let name = input[0];
    if (name == undefined) throw 'not found name';
    if (typeof name !== 'string') throw 'name must be string';
    if (name.length < 1) throw 'name must be more than 1 character';
    if (name.length > 50) throw 'name must be less than 50 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const enumCol = db.collection("enum");

    const isExist = await enumCol.findOne({
        name: name
    });

    if (isExist) throw 'name is exist';
    const now = new Date().getTime();
    const data = {
        name,
        descriptions: [],
        data: {},
        createAt: now,
        updateAt: now,
    }

    await enumCol.insertOne(data);
}