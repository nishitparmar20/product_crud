const { dbconnect } = require("../DB/dbconnect");
const crypto = require("crypto");

async function ForgotPassword(req, res) {

    const { email } = req.body;

    let db = await dbconnect();
    let collection = db.collection("user");

    const user = await collection.findOne({ email });

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await collection.updateOne(
        { email },
        { $set: { resetToken: token } }
    );

    res.status(200).json({
        success:true,
        message:"Reset token generated",
        email : email

    });
}

module.exports = { ForgotPassword };