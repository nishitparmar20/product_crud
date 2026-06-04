import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      <h1>
        Ecommerce Dashboard
      </h1>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/add")}
        >

          <h2>Add Product</h2>

          <p>
            Add new products with image
          </p>

        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/list")}
        >

          <h2>View Products</h2>

          <p>
            Search, Edit and Delete products
          </p>

        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/cart")}
        >

          <h2>Cart</h2>

          <p>
            View cart products
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;