const { ObjectId } = require("mongodb");
const { dbconnect } = require("../DB/dbconnect");

async function Delete(req,res) {
    const {id} = req.params;
    let db = await dbconnect();
    let collection = db.collection("products");
    let DeleteData  = await collection.deleteOne({_id : new ObjectId(id)});

    if(DeleteData.deletedCount > 0) {    
    return res.status(200).json({
        success:true,
        message:"Data deleted successfully",
    });
            
    }
    return res.status(400).json({
            success:false,
            message:"Data not delete",
        });

}
module.exports = {
    Delete
}