

const { connectDB } = require('../../utils/connect_db');
module.exports = async () => {
    const mdb = await connectDB();
    const db = mdb.db("schema");

    const enumCol = db.collection("enum");

    const enums = await enumCol.find({}).toArray();

    const res = enums.map(e => {
        const id = e._id.toString();
        const name = e.name;
        return {
            id,
            name
        }
    });

    res.sort((a, b) => a.name.localeCompare(b.name));
    return res;
}
