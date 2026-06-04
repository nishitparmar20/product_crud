const { dbconnect } = require("../DB/dbconnect");
const { options } = require("../Router/router");

async function Search(req,res) {
    let db = await dbconnect();
    let collection = db.collection("products");

    let {
        search,
        category,
        sort,
        page = 1
    }=req.query;

    let query = {};
    let sortOption = {};
    page = Number(page) || 1;
    let limit = 5;
    let skip = (page-1)*limit;

   if(search){
    query.$or = [
        {
            productName : {
                $regex : search,
                $options  : "i"
            }
        },

        {
            category : {
                $regex : search,
                $options : "i"
            }
        }, 
        {
            company : {
                $regex : search,
                $options : "i"
            }
        }
    ];
   }

   if(category){
    query.category = category;
   }

   if(sort === 'low'){
    sortOption.price = 1;
   }

   if(sort == 'high'){
    sortOption.price = -1;
   }

   let products = await collection.find(query).sort(sortOption).skip(skip).limit(limit).toArray();

   return res.status(200).json({
    success:true,
    products
   });

}



module.exports = {
    Search,
}