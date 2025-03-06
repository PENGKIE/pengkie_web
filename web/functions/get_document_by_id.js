const { connectDB , newObjectId } = require('../utils/connect_db');
/*

    input = {
        docId: String!
        docType: String! [f,c]
    }

*/
module.exports = async (input) => {

    if (!input.length) throw 'not found input';
    const {
        docId,
        docType
    } = input[0] //JSON.parse(input.body.text());
    // input.query

    if (typeof docId !== "string" || docId.length !== 24) throw "docId" + docId;

    let docCol;
    switch (docType) {
        case "f": docCol = "functionDocs"; break;
        case "c": docCol = "classDocs"; break;
        default: throw "docType" + docType;
    }

    const mdb = await connectDB();
    const db = mdb.db("functionDocuments");
    return await db.collection(docCol).findOne({
        _id: newObjectId(docId)
    });
}