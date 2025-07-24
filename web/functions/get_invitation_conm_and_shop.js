const { connectDB } = require('../utils/connect_db');
module.exports = async () => {
    const mdb = await connectDB();
    const db = mdb.db("pengkie_prod");
    const pengkieCol = db.collection("pengkie");

    const pengkie = await pengkieCol.findOne();

    return {
        invitationConmConm: pengkie?.invitationConmConm || null,
        invitationShopConm: pengkie?.invitationShopConm || null
    }

}