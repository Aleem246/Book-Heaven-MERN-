import express from "express"
const router = express.Router();
import Book from "../models/book.js";
import jwt from "jsonwebtoken";
import { authentication } from "./userAuth.js";
import User from "../models/user.js";
//create a book
router.post("/add-book" ,authentication ,  async(req , res)=>{
   try{
       const {id} = req.headers;
       const user = await User.findById(id);

       if(user.role !== "admin"){
          return  res.status(400).json({message:"You are not having accesss to perform this action"});
       }
    const { url , title , author , price , desc , lang } = req.body;
    const newBook = new Book({
        url : url,
        title : title,
        author : author, 
        price : price,
        desc : desc,
        lang : lang
    });

    await newBook.save();
   return  res.status(200).json({message : "Book added successfully"})

   }catch(err){
    res.status(500).json({message: "Internal Server Error"});
}

});

//update a book
router.put("/update-book", authentication , async (req, res)=>{
    try{
        const {bookid, id : userid} = req.headers;
        
        const user = await User.findById(userid); //await 

       
        if(user.role !=="admin"){
            return res.status(400).json({message:"you dont have access to action"});
        }

        const {url , title , author , price , desc ,lang} = req.body;
        
        const updateBook = { //new book X
            url : url,
            title : title,
            author : author,
            price : price,
            desc : desc,
            lang : lang
        };
        const updated = await Book.findByIdAndUpdate(bookid, updateBook, {new:true}); //new : true
        
        
        if(!updated){
            return res.status(404).json({message:"Book not found"});
        }
        return res.status(200).json({message : "Book is updated successfully"});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
});

//delete a book
router.delete("/delete-book", authentication , async (req, res)=>{
    try{
        const {userid} = req.headers;
        const {bookId} = req.body;
        const user =await User.findById(userid);
        if(user.role!=="admin"){
            return res.status(400).json({message:"you dont have access to action"});
        } 
        console.log(bookId);
        const book = await Book.findByIdAndDelete(bookId);
        if(!book){
            return res.status(400).json({message:"Cant find book"});
        }
        return res.status(200).json({message:"Book Deleted Successfully"});
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
});

//read a book
router.get("/get-all-books", async(req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.status(200).json({data:books});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }

});
router.get("/get-recent-books", async(req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.status(200).json({data:books});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }

});

router.get("/get-book/:id", async (req, res)=>{
    try{

        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({data:book});

    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }


});
export {router}

//admin pass -admin@123