const { ObjectId } = require("mongodb");

const { dbconnect } = require("../DB/dbconnect");

async function Single(req, res) {

    try {

        const { id } = req.params;

        let db = await dbconnect();

        let collection = db.collection("products");

        let product = await collection.findOne({

            _id : new ObjectId(id)
        });

        if(product){

            return res.status(200).json({

                success : true,

                product
            });
        }

        return res.status(404).json({

            success : false,

            message : "Product Not Found"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success : false,

            message : "Server Error"
        });
    }
}

module.exports = {
    Single
};