import React from "react"
import Home from "/src/pages/Home"
// import jwt from "jsonwebtoken"
import {jwtDecode} from 'jwt-decode';
import Navbar from "/src/components/Navbar/Navbar"
import Footer from "/src/components/Footer/Footer"
import { Routes , Route, useNavigate} from "react-router-dom"
import AllBooks from "/src/pages/AllBooks"
import Login from "/src/pages/Login"
import Signup from "/src/pages/Signup"
import Cart from "/src/pages/Cart"
import Profile from "/src/pages/Profile"
import SingleBook from "/src/components/SingleBook/SingleBook"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "/src/store/auth"
import { useEffect } from "react"

import Favourites from "/src/components/profile/Favourites"
import OrderHistory from "/src/components/profile/OrderHistory"
import Settings from "/src/components/profile/Settings"
import AllOrders from "/src/components/profile/AllOrders"
import AddBook from "/src/components/profile/AddBook"
import EditBook from "/src/components/profile/EditBook"
import { Box } from "@chakra-ui/react";
import {AboutUs} from "/src/components/Footer/AboutUs"


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
