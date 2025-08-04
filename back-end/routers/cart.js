import express from "express"
import {authentication} from "./userAuth.js";
import User from "../models/user.js";
const router  = express.Router();

router.put("/add-to-cart" , authentication , async(req, res)=>{
    try{
        const {id,bookid} = req.headers;
        const userData = await User.findById(id);
        const contains = userData.cart.includes(bookid);
        //  console.log(userData);
        if(contains){
            return res.status(200).json({message : "Book is already added to cart"});
        }
        await User.findByIdAndUpdate(id , {$push : {cart : bookid}});
        return res.status(200).json({message : "Book added to cart "});

    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
});


router.put("/remove-from-cart/:bookid", authentication , async (req, res)=>{
    try{
        const { bookid} = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const contains = userData.cart.includes(bookid);
        if(!contains){
            return res.status(200).json({message : "Book not Found"});
        }

        await User.findByIdAndUpdate(id , {$pull : {cart : bookid}});
        return res.status(200).json({message : "Book removed from cart successfully"});

    }catch(err){
        return res.status(500).json({message : "Internal Server Error"});
    }
});

router.get('/get-user-cart' , authentication , async (req, res)=>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id).populate('cart');
        const cart = user.cart;
        return res.status(200).json({data : cart});

    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal Server Error"});
    }
})

export {router}