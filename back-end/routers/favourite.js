// Import necessary modules
import express from "express";
const router = express.Router();
import User from "../models/user.js";
import { authentication } from "./userAuth.js";

router.put("/add-fav",authentication, async(req,res)=>{
    try{
        const {bookid , id} = req.headers;
        
        const userData = await User.findById(id);
        const contains =  userData.favourites.includes(bookid);
        if(contains){
            return res.status(200).json({message : "Book already exists in favourites"});
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid }}, { new: true });
        return res.status(200).json({message:"Book added to favourites successfully"});

    }catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }


});

router.put("/remove-fav", authentication , async(req, res)=>{
    try{
        const {bookid , id} = req.headers;
        const userData = await User.findById(id);
        const contains =userData.favourites.includes(bookid)
        if(contains){
            await User.findByIdAndUpdate(id,{$pull : {favourites:bookid}} , {new : true} )
        }
        return res.status(200).json({message:"Book removed from favourites successfully"})
    }
    catch(err){
        res.status(500).json({message : "Internal Server Error"});
    }
});
//header should be accessed in small letter

router.get("/get-fav", authentication , async(req ,res)=>{
    try{

        // const {id} = req.headers;
        const {id} = req.headers;
      
        const userData = await User.findById(id).populate("favourites").sort({createdAt : -1}); // bring data , rather display the id;
        // console.log(userData.favourites);
        const favourites = userData.favourites;
        return res.status(200).json({data : favourites});

    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal  Server  Error"});
    }
        

});
export {router};