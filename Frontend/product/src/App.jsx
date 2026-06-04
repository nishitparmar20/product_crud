
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Addproduct from './pages/Addproduct'
import Protectedroutes from './routes/Protectedroutes'
import Viewproduct from './pages/Viewproduct'
import Edit from './pages/Edit'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import SingleProductPage from './pages/SingleProductPage'
import Cart from './pages/Cart'


function App() {
  return (
    <>
        <ToastContainer/>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/dashboard' element = {<Protectedroutes><Dashboard/></Protectedroutes>}/>
          <Route path='/add' element ={<Addproduct/>} />
          <Route path='/product/:id' element={<SingleProductPage/>}/>
          <Route path='/cart' element = {<Cart/>}/>
          <Route path='/list' element ={<Viewproduct/>}/>
          {/* <Route path='/delete/:id' element={<Delete/>}/> */}
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          
        </Routes>
        </BrowserRouter>
    </>
  )  
}

export default App
