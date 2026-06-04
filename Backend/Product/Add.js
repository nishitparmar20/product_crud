const { dbconnect } = require("../DB/dbconnect");

async function Add(req,res) {
    let db = await dbconnect();
    let collection = db.collection("products");
    let {
        productName,
        price,
        category,
        company 
    }=req.body;
    console.log(req.body);
    
    if(!productName || !price || !category || !company) {
       return res.status(400).json({
            success:false,
            message:"All fields are required",
        });
    }

    let Data = await collection.insertOne({
        productName,
        price : Number(price),
        category,
        company,
        image : req.file.filename,
        userId : req.user.id
    });

    if(!Data.insertedId) {
        res.status(400).json({
            success:false,
            message:"Data not insert",
        });
    }

    res.status(200).json({
        success:true,
        message:"Add items successfully",
    });
    
}
module.exports = {
    Add,
}