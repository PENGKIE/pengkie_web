
const { connectDB } = require('../../utils/connect_db');
const { BSON } = require('mongodb');
module.exports = async (input) => {
    let id = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const schema = await schemaCol.findOne({
        _id: new BSON.ObjectId(id)
    });
    if (!schema) throw 'not found schema';

    return {
        id: schema._id.toString(),
        name: schema.name,
        descriptions: schema.descriptions,
        data: schema.data
    }
}
/* 
{
    _id:ObjectId
    isMain:Boolean
    name:String
    descriptions:String[]
    data:{
        [fieldName]:{
            type: String,
            ref: String, // ref to enum or Object
            isArray: Boolean,
            descriptions: String[],
        }
    }
} 
    
*/