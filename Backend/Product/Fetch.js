
const { dbconnect } = require("../DB/dbconnect");

async function Fetch(req,res) {
    let db = await dbconnect();
    let collection = db.collection("products");
    let fetchData = await collection.find({userId : req.user.id}).toArray();

    if(!fetchData) {
        return res.status(400).json({
            success:false,
            message:"Data not fetch ",
        });
    }

    return res.status(200).json({
        success:true,
        fetchData,
        message:"Data Fetched Successfully",
    });
}
module.exports = {
    Fetch,
}