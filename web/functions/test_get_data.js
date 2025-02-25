const { connectDB } = require('../utils/connect_db');
module.exports = async () => {
    const mdb = await connectDB();
    const db = mdb.db('functionDocuments');
    const collection = db.collection('classDocs');

    return await collection.find().toArray();
}