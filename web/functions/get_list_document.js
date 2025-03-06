const { connectDB } = require('../utils/connect_db');
module.exports = async () => {
    const mdb = await connectDB();
    const db = mdb.db("functionDocuments");
    const classDocsCol = db.collection("classDocs");
    const functionDocsCol = db.collection("functionDocs");

    const [
        functions,
        classes
    ] = await Promise.all([
        functionDocsCol.aggregate([
            {
                $group: {
                    _id: {
                      id: "$appType",
                      trigs: "$isTrigger"
                    },
                    items: {
                        $push: {
                            id: { $toString: "$_id" },
                            isPublish: "$isPublish",
                            name: "$name",
                            isTrigger: "$isTrigger"
                        }
                    }
                },
            },
            {
                $project: {
                    _id: "$_id.id",
                    items: 1,
                    key: { $cond : [ { $eq : [ "$_id.trigs" , true] } , "ts" , "fs" ] }
                }

            }
        ]).toArray(),
        classDocsCol.aggregate([
            {
                $group: {
                    _id: "$appType",
                    items: {
                        $push: {
                            id: { $toString: "$_id" },
                            isPublish: "$isPublish",
                            name: "$name",
                            isListType: "$isListType",
                            keys: "$keys"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    items: 1,
                    key: "cs"
                }
            }
        ]).toArray()
    ]);

    let output = {}
    let sortKey = [];

    const arr = [...functions, ...classes];

    let num = 0;
    arr.forEach(i => {
        const values = {};
        const name = i.items.map( x => {
            let key = x.name.toUpperCase();
            if (values[key]) {
                num += 1;
                key += num;
            }

            values[key] = x;
            return key;
        });

        name.sort();
        name.forEach( key => {
            if (!output[i._id]) {
              output[i._id] = {
                type : i._id,
                [i.key] : []
              }
              sortKey.push(i._id);
            }
            if (!output[i._id][i.key]) output[i._id][i.key] = [];
            output[i._id][i.key].push(values[key]);
        })
    });

    sortKey.sort();

    return sortKey.map( key => output[key]);
}