import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/singleproduct.css'
import API from "../service/api";
import { toast } from "react-toastify";

function SingleProductPage() {

    const { id } = useParams();

    const [products, setProducts] = useState({});

    useEffect(() => {

        const fetchSingle = async () => {

            try {

                const response = await API.get(
                    `/single/${id}`
                );

                console.log(response.data);

                if(response.data.success){

                    setProducts(
                        response.data.product
                    );
                }

            } catch (error) {

                console.log(error);
            }
        };

        fetchSingle();

    }, [id]);

const handleCart = () => {

   let oldCart = JSON.parse(
      localStorage.getItem("cart")
   ) || [];

   const updatedCart = [
      ...oldCart,
      products
   ];

   localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)
   );

   toast.success(
      "Product Added Successfully",{
        autoClose:1000,
        onClose : ()=>navigate("/cart")
      }

    );
}
    const navigate = useNavigate();

    return (

        <>

            <h1>Single Product</h1>
       <div className="single-product">

  <div className="single-product-card">

    <img
      src={`http://localhost:8000/uploads/${products.image}`}
      alt=""
    />

    <div className="product-details">

      <h2>{products.productName}</h2>

      <h3>₹ {products.price}</h3>

      <h4>Category : {products.category}</h4>

      <h5>Company : {products.company}</h5>

      <p>
        Premium quality product with modern design and excellent performance.
      </p>

      <button onClick={handleCart}>
        Add To Cart
      </button>

    </div>

  </div>

</div>
        </>
    );
}

export default SingleProductPage;