import { useState } from 'react'
import API from '../service/api';
import '../css/auth.css'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Login() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLogin((prevdata) => {
            return {
                ...prevdata,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await API.post("/login", login);
            localStorage.setItem("token", response.data.token);
            console.log(response.data);

            toast.success("Login Successfull", {
                autoClose: 1500,
                onClose: () => navigate("/dashboard")
            })

        } catch (error) {

    console.log(error.response.data);

    toast.error(
        error.response.data.message
    );


        }
    }

    return (
        <>

        <div className="auth-container">
            <form onSubmit={handleSubmit} className='auth-form'>
                <label htmlFor="">email : </label>
                <input type="text" value={login.email} name="email" onChange={handleInputChange} id="" />
                <br /><br />
                <label htmlFor="">password : </label>
                <input type="password" name="password" value={login.password} onChange={handleInputChange} id="" />
                <br /><br />
                <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <button type="submit">Login</button>
            </form>
            </div>
        </>
    )
}

export default Login
