import { useState } from "react";

import { useParams } from "react-router-dom";
import API from "../service/api";

function ResetPassword(){

 const { token } = useParams();
 const [password,setPassword] = useState("");

 const handleSubmit = async(e)=>{
  e.preventDefault();

  await API.post("/reset-password",{
     token: token,
     password: password
  });

  alert("Password Reset Successful");
 }

 return(

   <form onSubmit={handleSubmit}>

     <input
       type="password"
       placeholder="Enter new password"
       onChange={(e)=>setPassword(e.target.value)}
     />

     <button type="submit">Reset Password</button>

   </form>

 )

}

export default ResetPassword;