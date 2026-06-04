import { useState } from "react";
import API from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import "../css/auth.css"
// import './register.css'
import {toast} from 'react-toastify'
function Register() {
    const [reg, setReg] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setReg((prevdata)=>{
            return {
                 ...prevdata,
                [name] : value,
            }
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await API.post("/register",reg);
            console.log(response);

        
            toast.success("Register successfull",{
                autoClose:1500,
                onClose : ()=> navigate("/login")
            });
        } catch (error) {
            toast.error("Register failed",{
                autoClose:2000,
            
            });
        }

       
    }

    return (
        <>
        <div className="auth-container">

            <form onSubmit={handleSubmit} className="auth-form">
                <h2 style={{ textAlign:"center",marginBottom:"20px"}}>Register</h2>  
                <label htmlFor="">Name : </label>
                <input type="text" name="name" onChange={handleInputChange} value={reg.name} placeholder="enter your name" />
                <br /><br />
                <label htmlFor="">Email : </label>
                <input type="email" name="email" placeholder="enter your email" onChange={handleInputChange} value={reg.email} />
                <br /><br />
                <label htmlFor="">Password : </label>
                <input type="password" name="password" placeholder="enter your password" onChange={handleInputChange} value={reg.password}/>
                <br /><br />
                <button type="submit">Register</button>
                {/* <br /><br /> */}
                 <p>Already Have An Acoount ?
            <Link to="/login">Login</Link>
        </p>
            </form>
            </div>
        </>
    )
}

export default Register;
