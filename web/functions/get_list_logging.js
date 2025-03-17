const { connectDB, newObjectId } = require('../utils/connect_db');

/*

    input = {
        docId: string
        env: string
        isHasError: boolean
        app: [string]
        uid: string
        startAt: number
        fnName: string
        currectPage: number
        isNext: boolean
    }

    output {
        currectPage: number
        nextId: string
        preId
        docs: [doc]
        error : string
    }




    pagination: 100,
    sort by _id -1

    can fillter by
    isHasError
    app
    uid
    range of time (from start)
    fnName

    and env. (dev,test, qa)
    db pengkie, pengkie_test, pengkie_qa
    collection logging
*/

module.exports = async (input) => {

    if (!input.length) throw 'not found input';
    const {
        docId,
        env,
        isHasError,
        app,
        uid,
        startAt,
        fnName,
        currectPage,
        isNext
    } = input[0]

    let forError;
    const appBase = ['vendor', 'shop', 'consumer'];

    const limit = 50;
    let match = {};
    const outptu = {};
    let dbCol;
    switch (env) {
        case "dev": dbCol = "pengkie"; break;
        case "test": dbCol = "pengkie_test"; break;
        case "qa": dbCol = "pengkie_qa"; break;
        default: return { error: 'Not found ' + env + ' page for ENV.' }
    }
    if (typeof isNext !== 'boolean') return { error: 'Not found page' }
    if (!Array.isArray(app)) return { error: 'Not found with current app' }
    if (app.length) {
        let apps = [...new Set(app)];
        apps = apps.map(a => {
            if (!appBase.includes(a)) forError = { error: 'Not found page with ' + a + ' app' }
            return { app: a }
        });
        if (app.length == 1) match.app = app[0]
        else if (app.length == 2) match['$or'] = apps;
    }
    if (forError) return forError;

    if (docId && typeof isNext == 'boolean') {
        if (typeof docId !== "string" || docId.length !== 24) return { error: 'Not found Next page.' }
        match['_id'] = isNext ? { $lt: newObjectId(docId) } : { $gt: newObjectId(docId) };
    }
    if (uid) {
        if (typeof uid !== "string" || uid.length !== 24) return { error: 'Not found page with ' + uid + 'uid' }
        match.uid = uid;
    }
    if (startAt) {
        if (typeof startAt !== "number" || startAt <= 0) return { error: 'Not found page date start at ' + new Date(startAt) }
        match.start = { $gte: startAt };
    }
    if (isHasError) {
        if (typeof isHasError !== "boolean") return { error: 'Not found page with ' + isHasError + ' isHasError' }
        match.error = { $ne: null };
    }
    if (fnName) {
        if (typeof fnName !== "string") return { error: 'Not found page with current function' }
        if (fnName.trim().length) match.fnName = new RegExp(fnName.trim(), "i");
    }
    if (typeof currectPage !== 'number' || currectPage < 0) return { error: 'Not found current page' }

    let sort = [];
    if (isNext) {
        sort  = [
            {
                $sort: {
                    _id: -1
                }
            },
            { $limit: limit + 1 }
        ]
    } else {
        sort  = [
            {
                $sort: {
                    _id: 1
                }
            },
            { $limit: limit },
            {
                $sort: {
                    _id: -1
                }
            },
        ]
    }

    match = Object.keys(match).length ? [{ $match: match }] : [];

    const mdb = await connectDB();
    const db = mdb.db(dbCol);
    const docs = await db.collection('logging').aggregate([
        ...match,
        ...sort
    ]).toArray();

    if (docs.length > limit) {
        docs.length = limit;
        return {
            currectPage: currectPage ? currectPage + 1 : 1,
            nextId: docs[limit - 1]._id.toString(),
            preId: docs[0]._id.toString(),
            docs
        }
    }

    return {
        currectPage: currectPage ? currectPage + 1: 1,
        nextId: !isNext ? docs[docs.length - 1]._id.toString() : null,
        preId: docs[0]._id.toString(),
        docs
    }
}