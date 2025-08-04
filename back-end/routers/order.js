import express from "express"
import {authentication} from "../routers/userAuth.js";
import User from "../models/user.js";
import Order from "../models/order.js";
import Book from "../models/book.js";
const router = express.Router();

router.post("/place-order", authentication , async (req, res)=>{
    try{
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user : id , book : orderData._id});
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {$push:{orders : orderDataFromDb._id}});

            await User.findByIdAndUpdate(id , {$pull: {cart : orderData._id}});
        }

        return res.status(200).json({message: "Order Placed Successfully"});

    }catch(err){
        console.log(err);
        return res.status(200).json({message : "Internal Server Error"});
    }
});

router.get("/get-order-history" , authentication , async(req , res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("orders").populate({
            path : "orders",
            populate : {path : "book"}
        });

        const ordersData = userData.orders.reverse();
        return res.status(200).json({data : ordersData});


    }catch(err){
        console.log(err); 
        return res.status(200).json({message : "Internal Server Error"});
    }
});

//admin
router.get("/get-all-orders" ,authentication , async(req, res)=>{
    try{

        const userData = await Order.find().populate({
            path : 'book',
        }).populate({
          path : "user",  
        }).sort({createdAt : -1});
        return res.status(200).json({data : userData});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
});
//admin
router.put("/update-status/:orderId" , authentication , async (req, res)=>{
    try{
        const {orderId} = req.params;
        const {id} = req.headers;
        const {status}  = req.body;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({message:"you dont have access to action"});
        }
        await Order.findByIdAndUpdate(orderId , {status : status});
        return res.status(200).json({message : "Order Updated Successfully"});;
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})

export {router};