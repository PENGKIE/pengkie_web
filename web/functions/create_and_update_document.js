
const { connectDB , newObjectId } = require('../utils/connect_db');
/*

    input = {
        docId: String
        docType: String! [f,c],
        data: object
    }

*/
exports = async function (input) {

    if (!input.length) throw 'not found input';
    const {
        docId,
        docType,
        data,
        preDoc
    } = input[0];
    // JSON.parse(input.body.text());

    if (docId) if (typeof docId !== "string" || docId.length !== 24) throw "docId" + docId;
    if (data) if (!Object.keys(data).length) throw "invalid data";

    const getColDoc = (x) => {
        switch (x) {
            case "f": return "functionDocs";
            case "c": return "classDocs";
            default: throw "docType" + x;
        }
    }

    const mdb = await connectDB();
    const db = mdb.db("functionDocuments");
    const docCol = db.collection(getColDoc(docType));
    const docTypen = (data?.isTrigger || null) ? 't' : docType;
    let output = (data?.appType || '') + docTypen + '-';

    if (preDoc) {

        const { preId, preType } = preDoc;

        if (typeof preId !== "string" || preId.length !== 24) throw "preId" + preId;
        if (!data) throw "invalid data";

        const preCol = db.collection(getColDoc(preType));

        const session = mdb.startSession();
        try {

            await session.withTransaction(async () => {

                const [
                    preDocument,
                    res
                ] = await Promise.all([

                    (async () => {
                        let preDocument;
                        try {
                            preDocument = await preCol.findOneAndUpdate(
                                { _id: newObjectId(preId) },
                                { $set: {} },
                                {
                                    returnNewDocument: true,
                                    returnDocument: "after",
                                    session
                                }
                            );
                            const { lastErrorObject, value, ok, operationTime } = preDocument;
                            if (lastErrorObject && ok && operationTime) preDocument = value;
                        } catch (e) { }
                        return preDocument;
                    })(),

                    docCol.updateOne(
                        {
                            ...docId ? { _id: newObjectId(docId)} 
                            : {
                                name: data.name,
                                appType: data.appType
                            }
                        },
                        { $set: data },
                        { 
                            session,
                            upsert: true
                        }
                    )

                ]);

                if (!preDocument) throw 'not found preDocument';

                let newType = data.appType + '-';
                if (docId) {
                    if (!res.matchedCount) throw "failed to update";
                    newType += docId;
                    output += docId;
                } else {
                    if (!res.upsertedId) throw 'failed to create';
                    newType += res.upsertedId.toString();
                    output += res.upsertedId.toString();
                }

                let key;
                let dataUpdate = [];
                let isInput = preType == "c" ? 'keys' : (preDocument.input.some(x => x.type == 'new-class') ? 'input' : 'output');

                dataUpdate = preDocument[isInput].map(x => {
                    if (x.type == 'new-class') {
                        x.type = newType;
                        key = isInput;
                    }
                    return x;
                });

                if (key) {
                    const newRes = await preCol.updateOne(
                        { _id: preDocument._id },
                        { $set: { [key] : dataUpdate } },
                        { session }
                    );
                    if (!newRes.matchedCount) throw "failed to update preDoc";
                }
            });

        } catch (err) {
            throw err
        } finally {
            session.endSession();
        }

    } else {
        if (!data) {
            if (!docId) throw 'docId invalid';
            const res = await docCol.deleteOne(
                { _id: newObjectId(docId) }
            );
            if (!res.deletedCount) throw "failed to delete";
            output += 'home';
        } else {
            const res = await docCol.updateOne(
                {
                    ...docId ? { _id: newObjectId(docId)} 
                    : {
                        name: data.name,
                        appType: data.appType
                    }
                },
                { $set: data },
                { upsert: true }
            );
            if (!res.matchedCount && !res.upsertedId) throw "failed to update";
            output += docId || res.upsertedId.toString();
        }
    }

    return { urlId: output };

};