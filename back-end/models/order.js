import mongoose from "mongoose";
import Book from "../models/book.js";
const orderSchema = new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
    },
    status:{
        type:String,
        default:"order placed",
        enum:["order placed","out for delivery","Delivered", "Canceled"],

    }
},{timestamps:true});
const Order =  mongoose.model("Order",orderSchema);
export default Order;
