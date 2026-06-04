const jwt = require("jsonwebtoken");

function Auth(req, res, next) {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"token not found"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success:false,
            message:"invalid token"
        });

    }

}

module.exports = { Auth };