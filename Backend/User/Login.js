const { dbconnect } = require("../DB/dbconnect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function Login(req, res) {

    let db = await dbconnect();
    let collection = db.collection("user");

    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "all fields are required",
        });
    }

    let user = await collection.findOne({
        email: email,
    });

    console.log(user);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "user not found",
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({
            success: false,
            message: "invalid password",
            isAuth: false,
        });
    }

    console.log(match);
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        "secretkey",
        { expiresIn: "1h" }
    );

    return res.status(200).json({
        success: true,
        message: "Login Successful",
        isAuth: true,
        token: token,
    });

}

module.exports = {
    Login
}