const { ObjectId } = require("mongodb");
const { dbconnect } = require("../DB/dbconnect");

async function Edit(req, res) {

    const { id } = req.params;

    let db = await dbconnect();
    let collection = db.collection("products");

    let {
        productName,
        price,
        category,
        company
    } = req.body;

    let productData = await collection.findOne({
        _id: new ObjectId(id),
        userId: req.user.id
    });

    if (!productData) {
        return res.status(400).json({
            success: false,
            message: "Product not found",
        });
    }

    let Editdata = {
        productName: productName || productData.productName,
        price: price || productData.price,
        category: category || productData.category,
        company: company || productData.company,
    
    };

    let updateData = await collection.updateOne(
        {
            _id: new ObjectId(id)
           
        },
        {
            $set: Editdata
        }
    );

    return res.status(200).json({
        success: true,
        message: "Data Edited Successfully",
    });

}

module.exports = {
    Edit,
}