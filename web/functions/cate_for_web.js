const { connectDB } = require('../utils/connect_db');
module.exports = async () => {

    const mdb = await connectDB();
    const db = mdb.db("pengkie");
    const consumerMainCategoryCol = db.collection("consumerMainCategory");
    const consumerSubCategoryCol = db.collection("consumerSubCategory");
    const consumerDeepCategoryCol = db.collection("consumerDeepCategory");

    const [
        mainCates,
        subCates,
        deepCates
    ] = await Promise.all([
        consumerMainCategoryCol.find().toArray(),
        consumerSubCategoryCol.find().toArray(),
        consumerDeepCategoryCol.find().toArray(),
    ]);

    let output = {};
    let subCateSet = {};

    deepCates.forEach(deepCate => {
        const id = deepCate._id.toString();
        const deepData = {
            id,
            thumbnail: deepCate.thumbnail || "-",
            title: deepCate.title.length ? deepCate.title.reduce((p, c) => ({ ...p, [c.lang]: c.text || "-" }), {}) : {},
        }
        deepCate.subCategoryIds.forEach(subId => {
            if (!subCateSet[subId]) subCateSet[subId] = {
                id: subId,
                deepCategory: [],
                nDeep: 0,
                nDeepImgNull: 0
            };
            subCateSet[subId].deepCategory.push(deepData);
            subCateSet[subId].nDeep += 1;
            subCateSet[subId].nDeepImgNull += deepCate.thumbnail ? 0 : 1;
        });

    });

    mainCates.forEach(mainCate => {
        const id = mainCate._id.toString();
        output[id] = {
            id,
            thumbnail: mainCate.thumbnail || "-",
            title: mainCate.title.length ? mainCate.title.reduce((p, c) => ({ ...p, [c.lang]: c.text || "-" }), {}) : {},
            subCategory: [],
            nSub: 0,
            nSubImgNull: 0,
            nDeep: 0,
            nDeepImgNull: 0
        }
    });

    subCates.forEach(subCate => {
        const id = subCate._id.toString();
        if (!subCateSet[id]) subCateSet[id] = {
            id, deepCategory: [],
            nDeep: 0,
            nDeepImgNull: 0
        };
        subCateSet[id].thumbnail = subCate.thumbnail || "-";
        subCateSet[id].title = subCate.title.length ? subCate.title.reduce((p, c) => ({ ...p, [c.lang]: c.text || "-" }), {}) : {};
        subCate.mainCategoryIds.forEach(mainId => {
            if (output[mainId]) {
                output[mainId].subCategory.push(subCateSet[id]);
                output[mainId].nSub += 1;
                output[mainId].nSubImgNull += subCate.thumbnail ? 0 : 1;
                output[mainId].nDeep += subCateSet[id].nDeep;
                output[mainId].nDeepImgNull += subCateSet[id].nDeepImgNull;
            }
        });
    });

    return Object.values(output);
};

