import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import '../css/cart.css'
function Cart() {

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const data = JSON.parse(
            localStorage.getItem("cart")
        );

        if (data) {

            setCart(data);
        }

    }, []);

    const handleRemove = (id) => {

   const updatedCart = cart.filter(

      (item) => item._id !== id
   );

   setCart(updatedCart);

   localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)
   );
   toast.success(
      "Product Removed"
   );
}
   return (
  <>
    <h1>Cart Page</h1>

    <div className="cart-container">
      {cart.map((item) => (
        <div key={item._id} className="cart-card">
          
          <img
            src={`http://localhost:8000/uploads/${item.image}`}
            alt={item.productName}
          />

          <h2>{item.productName}</h2>

          <h3>₹ {item.price}</h3>

          <button onClick={() => handleRemove(item._id)}>
            Remove
          </button>

        </div>
      ))}
    </div>
  </>
);
}

export default Cart;