import React from "react"
import Home from "./pages/Home"
// import jwt from "jsonwebtoken"
import {jwtDecode} from 'jwt-decode';
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import { Routes , Route, useNavigate} from "react-router-dom"
import AllBooks from "./pages/AllBooks"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import SingleBook from "./components/SingleBook/SingleBook.jsx"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth.js"
import { useEffect } from "react"

import Favourites from "./components/profile/Favourites.jsx"
import OrderHistory from "./components/profile/OrderHistory.jsx"
import Settings from "./components/profile/Settings.jsx"
import AllOrders from "./components/profile/AllOrders.jsx"
import AddBook from "./components/profile/AddBook.jsx"
import EditBook from "./components/profile/EditBook.jsx"
import { Box } from "@chakra-ui/react";
import AboutUs from "./components/Footer/AboutUs.jsx";

const App = () =>{
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const role = useSelector((state) => state.auth.role);
    const validateToken = ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authActions.logout());
            localStorage.clear();
            navigate('/');
        }
        try{
            // console.log(token);
            const decoded = jwtDecode(token);
            // console.log("Decoded JWT:", decoded);
            if(!decoded || !decoded.exp || decoded.exp < Date.now()/1000){
                localStorage.clear();
                dispatch(authActions.logout());
                navigate('/');
            }
        }catch(err){
            localStorage.clear();
            dispatch(authActions.logout());
            console.error("Token decode error:", err);
            navigate('/');
        }
    }

    useEffect(() => {

        validateToken();
        
        
        if(localStorage.getItem("id")&&localStorage.getItem("role")&&localStorage.getItem("token"))
            {
                dispatch(authActions.login());
                dispatch(authActions.changeRole(localStorage.getItem('role')));

            }
        window.scrollTo(0, 0);    
        const intervalId = setInterval(validateToken , 5*60*1000);

        return ()=> clearInterval(intervalId);
        
    }, []);
    return(
        <>
        <Box w="99vw">
            <Navbar/>
                <Routes>
                    <Route  path="/" element={<Home/>}/>
                    <Route path="/all-books" element={<AllBooks/>}/>
                    <Route path="/log-in" element={<Login/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/sign-up" element={<Signup/>}/>
                    <Route path="/edit/:id" element={<EditBook/>}/>
                    <Route path="/profile" element={<Profile/>}>
                    {(role==='user') ? <Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>}/> }
                    {(role==='admin') && <Route path='/profile/add-book' element={<AddBook/>}/>}
                        
                        <Route path="/profile/settings" element={<Settings/>}/>
                        <Route path="/profile/orderHistory" element={<OrderHistory/>}/>
                    </Route>
                    <Route path="/cart" element={<Cart/>}/>
                    
                    <Route path="/get-book/:id" element={<SingleBook/>}/>
                    
                </Routes>
            <Footer/>
            
        </Box>
          
        </>
    )
}

export default App;
