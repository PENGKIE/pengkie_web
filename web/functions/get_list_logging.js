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
        ip: string
        errorStr: string
        args: string, array , object
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
    let {
        docId,
        env,
        isHasError,
        app,
        uid,
        startAt,
        endAt,
        fnName,
        currectPage,
        isNext,
        ip,
        errorStr,
        args
    } = input[0]

    let forError;
    let errorOr;
    let argsOr;
    const appBase = ['vendor', 'shop', 'consumer'];

    const limit = 50;
    let match = {};
    let dbCol;
    let isProd = false;
    switch (env) {
        case "dev": dbCol = "pengkie"; break;
        case "test": dbCol = "pengkie_test"; break;
        case "qa": dbCol = "pengkie_qa"; break;
        case "prod":
            dbCol = "pengkie_prod";
            isProd = true;
            ip = null;
            break;
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
    if (startAt || endAt) {
        if (startAt) if (typeof startAt !== "number" || startAt <= 0) return { error: 'Not found page date start at ' + new Date(startAt) }
        if (endAt) if (typeof endAt !== "number" || endAt <= 0) return { error: 'Not found page date end at ' + new Date(startAt) }
        if (startAt && endAt) {
            if (startAt == endAt) match.start = startAt;
            else if (endAt > startAt) match.start = { $lte: endAt, $gte: startAt };
            else match.start = { $lte: startAt, $gte: endAt };
        } else match.start = startAt ? { $lte: startAt } : { $gte: endAt };
    }
    if (isHasError) {
        if (typeof isHasError !== "boolean") return { error: 'Not found page with ' + isHasError + ' isHasError' }
        match.error = { $ne: null };
    }
    if (errorStr) {
        if (typeof errorStr == 'string' && errorStr.trim().length) {
            errorOr = [
                { error: new RegExp(errorStr.trim(), "i") },
                { 'error.errorCode': new RegExp(errorStr.trim(), "i") },
                { 'error.errorMessages.text': new RegExp(errorStr.trim(), "i") }
            ]
        }
    }
    if (fnName) {
        if (typeof fnName !== "string") return { error: 'Not found page with current function' }
        if (fnName.trim().length) match.fnName = new RegExp(fnName.trim(), "i");
    }
    if (ip) {
        if (typeof ip !== "string") return { error: 'Not found page with current IP' }
        if (ip.trim().length) match.ip = new RegExp(ip.trim(), "i");
    }

    if (typeof currectPage !== 'number' || currectPage < 0) return { error: 'Not found current page' }

    if (args) {
        if (Array.isArray(args) && args.length) args = args[0];
        if (typeof args == 'object' && !Array.isArray(args)) {
            argsOr = [
                Object.keys(args).reduce((p, x) => ({ ...p, ['args.' + x]: args[x] }), {}),
                { args: { $elemMatch: args } }
            ]
        } else {
            if (!isNaN(Number(args))) argsOr = [{ args: args * 1 }, { args: args }];
            else if (args.toUpperCase() === 'TRUE' || args.toUpperCase() === 'FALSE') argsOr = [{ args: Boolean(args) }, { args: args }];
            else match.args = new RegExp(args.trim(), "i");
        }
    }

    if (argsOr || errorOr) {
        if (argsOr && errorOr) {
            match['$and'] = [
                { $or: argsOr },
                { $or: errorOr }
            ]
        } else match['$or'] = argsOr || errorOr;
    }

    let sort = [];
    if (isNext) {
        sort = [
            {
                $sort: {
                    _id: -1
                }
            },
            { $limit: limit + 1 }
        ]
    } else {
        if (currectPage <= 1) return { error: 'Not found current page' }
        currectPage -= 2;
        sort = [
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

    if (isProd) sort.push({ $unset: ['ip', 'token '] });

    match = Object.keys(match).length ? [{ $match: match }] : [];

    const mdb = await connectDB();
    const db = mdb.db(dbCol);
    const docs = await db.collection('logging').aggregate([
        ...match,
        ...sort
    ]).toArray();

    if (!docs.length) return { error: 'Not found current page' };

    if (docs.length > limit) {
        docs.length = limit;
        return {
            currectPage: currectPage ? currectPage + 1 : 1,
            nextId: docs[limit - 1]._id.toString(),
            preId: docs[0]._id.toString(),
            isProd,
            docs
        }
    }

    return {
        currectPage: currectPage ? currectPage + 1 : 1,
        nextId: !isNext ? docs[docs.length - 1]._id.toString() : null,
        preId: docs[0]._id.toString(),
        isProd,
        docs
    }
}