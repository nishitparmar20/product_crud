const { dbconnect } = require("../DB/dbconnect");
const bcrypt = require("bcrypt");

async function ResetPassword(req,res){

    const { token, password } = req.body;

    let db = await dbconnect();
    let collection = db.collection("user");

    const user = await collection.findOne({ resetToken: token });

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid token"
        });
    }

    const hashpassword = await bcrypt.hash(password,10);

    await collection.updateOne(
        { resetToken: token },
        {
            $set:{ password: hashpassword },
            $unset:{ resetToken:"" }
        }
    );

    res.status(200).json({
        success:true,
        message:"Password reset successful"
    });

}

module.exports = { ResetPassword };