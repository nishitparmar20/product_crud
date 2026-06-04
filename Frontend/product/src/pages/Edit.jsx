import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import API from "../service/api";
import { toast } from "react-toastify";
import '../css/addedit.css'
function Edit() {
    const location = useLocation();
    const [company, setCompany] = useState(location.state || {
        productName : "",
        price :"",
        category : "standard",
        company : "",
    });

    const handleInputChange = (e)=>{
        const {name, value}  = e.target;
        setCompany((prevdata)=>{
            return {
                ...prevdata,
                [name] : value,
            };
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await API.put(`/edit/${company._id}`,company);
            console.log(response);

            toast.success("Edit successfully",{
                autoClose:1500,
                onClose : ()=> navigate("/dashboard")
            })
        } catch (error) {
            toast.error("Data not Edit",{
                autoClose:1500,
            });
        };
    }
    
    return (
    <>
    <div className="add-edit-container">
        <form onSubmit={handleSubmit} className="add-edit-form">
            <label htmlFor="">Prodcut Name : </label>
            <input type="text" value={company.productName} onChange={handleInputChange} name="productName" />
            <br /><br />
            <label htmlFor="">price</label>
            <input type="text" value={company.price} onChange={handleInputChange} name="price" id="" />
            <br /><br />
            <label htmlFor="">category</label>
            <select name="category" value={company.category} onChange={handleInputChange}  id="">
                <option value="standard">standard</option>
                <option value="basic">basic</option>
                <option value="top">top</option>
                <option value="medium">medium</option>
            </select>
            <br /><br />
            <label htmlFor="">Company : </label>
            <input type="text" name="company" value={company.company} onChange={handleInputChange} id="" />
            <br /><br />
            <button type="submit">Edit</button>
        </form>
        </div>
    </>
)
}

export default Edit
