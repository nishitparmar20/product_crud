


import { useEffect, useState } from "react";
import API from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/viewproduct.css";

function Viewproduct() {

  const [see, setSee] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchdata = async () => {

      try {

       const response = await API.get(
  `/search?search=${search}&category=${category}&sort=${sort}&page=${page}`
);

        if (response.data.success) {

          setSee(response.data.products);
        }

      } catch (error) {

        toast.error("Failed To Fetch Data");
      }
    };

    fetchdata();

  }, [search, category, sort, page]);

  const handleDelete = async (id) => {

    try {

      const response = await API.delete(`/delete/${id}`);

      if (response.data.success) {

        setSee((prev) =>
          prev.filter((item) => item._id !== id)
        );

        toast.success("Deleted Successfully");
      }

    } catch (error) {

      toast.error("Delete Failed");
    }
  };

  const handleEdit = (item) => {

    navigate(`/edit/${item._id}`, {
      state: item,
    });
  };

  return (

    <div className="product-page">

      <h1>All Products</h1>

      <div className="top-bar">

        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="">All</option>
          <option value="TV">TV</option>
          <option value="Car">Car</option>
          <option value="Mobile">Mobile</option>
          <option value="Clothes">Clothes</option>
          <option value="Books">Books</option>

        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >

          <option value="">Default</option>
          <option value="low">Low To High</option>
          <option value="high">High To Low</option>

        </select>

      </div>

      <div className="product-grid">

        {
          see.length > 0 ? (

            see.map((e, index) => (

              <div
                key={index}
                className="product-card"
              >

                <img
                  src={`http://localhost:8000/uploads/${e.image}`}
                  alt=""
                />

                <h2>{e.productName}</h2>

                <h3>₹ {e.price}</h3>

                <p>{e.category}</p>

                <span>{e.company}</span>

                <div className="btns">

                  <button
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/product/${e._id}`)
                    }
                  >
                    View
                  </button>

                </div>

              </div>
            ))

          ) : (

            <h2>No Products Found</h2>
          )
        }

      </div>

      <div className="pagination">

        <br />

<button
  onClick={() => setPage(page - 1)}
  disabled={page === 1}
>
  Prev
</button>

<span> Page {page} </span>

<button
  onClick={() => setPage(page + 1)}
>
  Next
</button>
      </div>

    </div>
  );
}

export default Viewproduct;
