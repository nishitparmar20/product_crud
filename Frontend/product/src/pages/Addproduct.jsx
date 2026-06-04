import { useState } from "react";
import API from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/addedit.css"
function Addproduct() {

  const [nish, setAdd] = useState({

    productName: "",

    price: "",

    category: "standard",

    company: "",

    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {

      setAdd((prevdata) => {

        return {

          ...prevdata,

          image: files[0],
        };
      });

    } else {

      setAdd((prevdata) => {

        return {

          ...prevdata,

          [name]: value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let formData = new FormData();

      formData.append(
        "productName",
        nish.productName
      );

      formData.append(
        "price",
        nish.price
      );

      formData.append(
        "category",
        nish.category
      );

      formData.append(
        "company",
        nish.company
      );

      formData.append(
        "image",
        nish.image
      );

      const token = localStorage.getItem("token");

      const response = await API.post(

        "/add",

        formData,

        {
          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      toast.success(
        "Product Added Successfully",
        {
          autoClose: 1500,

          onClose: () => navigate("/dashboard"),
        }
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Product Not Added",
        {
          autoClose: 1500,
        }
      );
    }
  };

  return (

    <div className="add-edit-container">

      <form onSubmit={handleSubmit} className="add-edit-form">

      <h1>Add Product</h1>
        <label>
          Product Name :
        </label>

        <input
          type="text"
          name="productName"
          value={nish.productName}
          onChange={handleChange}
        />

        <br /><br />

        <label>
          Price :
        </label>

        <input
          type="number"
          name="price"
          value={nish.price}
          onChange={handleChange}
        />

        <br /><br />

        <label>
          Category :
        </label>

        <select
          name="category"
          value={nish.category}
          onChange={handleChange}
        >

          <option value="standard">
            Standard
          </option>

          <option value="basic">
            Basic
          </option>

          <option value="top">
            Top
          </option>

          <option value="medium">
            Medium
          </option>

        </select>

        <br /><br />

        <label>
          Company :
        </label>

        <input
          type="text"
          name="company"
          value={nish.company}
          onChange={handleChange}
        />

        <br /><br />

        <label>
          Product Image :
        </label>

        <input
          type="file"
          name="image"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
}

export default Addproduct;