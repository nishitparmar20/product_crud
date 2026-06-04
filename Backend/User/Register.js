const {dbconnect} = require("../DB/dbconnect");
const bcrypt = require("bcrypt");
async function Register (req,res) {
        let db = await dbconnect();
        let collection  = db.collection("user");
        let {
            name,
            email,
            password,
        } = req.body;

        if(!name || !email || !password) {
          return  res.status(400).json({
                success:false,
                message : "All Fileds are required",
            });
        }

        const existingUser = await collection.findOne({email : email});
        if(existingUser) {
            return res.status(400).json({
                success:true,
                message:"user already register please login ",
            })
        }

        const hashpassword = await bcrypt.hash(password,10);
        let RegisterData = await collection.insertOne({
            name : name,
            email : email,
            password : hashpassword,
        });

        if(!RegisterData) {
            res.status(400).json({
                success:false,
                message:"Register failed",
            });
        }

         else {
            res.status(200).json({
                success:true,
                message:"Register successfull",
            });
         }
}
module.exports = {
    Register
}