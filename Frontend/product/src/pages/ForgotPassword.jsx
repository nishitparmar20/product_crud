import { useState } from "react";
import API from "../service/api";
import '../css/forgotpass.css'
function ForgotPassword(){

 const [email,setEmail] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   try{

     const res = await API.post("/forgot-password",{  email: email});

     alert(res.data.message);

   }catch(err){
     alert("User not found");
   }

 }

 return (
  <div className="forgot-container">
    <form className="forgot-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  </div>
);

}

export default ForgotPassword;