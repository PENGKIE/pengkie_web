
const { connectDB } = require('../../utils/connect_db');
const { BSON } = require('mongodb');
module.exports = async (input) => {
    let id = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const enumCol = db.collection("enum");
    const enumObj = await enumCol.findOne({
        _id: new BSON.ObjectId(id)
    });

    if (!enumObj) throw 'not found enum';

    return {
        id: enumObj._id.toString(),
        name: enumObj.name,
        descriptions: enumObj.descriptions,
        data: enumObj.data
    }
}

/* 
{
    _id:ObjectId
    name:String
    descriptions:String[]
    data:{
        [fieldName]:[descriptions[]]
    }
}
 */

