import { Navigate } from 'react-router-dom';

function Protectedroute({children}) {
 const token = localStorage.getItem("token");
 if(!token) {
    return <Navigate to="/login"/>
 }

 return children;
}

export default Protectedroute
