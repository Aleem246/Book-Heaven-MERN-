//500 - backend error
//400 - client error
//200 - success

//authentication
import express from "express";
const router = express.Router();
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authentication } from "./userAuth.js";
//sign-up
router.post("/sign-up" , async(req, res)=>{
    try{
        const {username, email , password , address} = req.body;
        if(username.length < 4){
           return res
            .status(400)
            .json( {message:"UserName must be more than 3 digits"});
        }

        const existuser =await User.findOne({username:username});
        if(existuser){
           return  res
            .status(400)
            .json({message : "Username Already Exist"});
        }

        const existemail = await User.findOne({email:email});
        if(existemail){
           return res.status(400)
            .json({message: "Email Already Exist"});
        }

        if(password.length < 6){
            res.status(400)
            .json({message:"Password must be Greater than 5 characters"});
        }
        const hashpass = await bcrypt.hash(password, 10);
        const newUser = await new User({
            username : username,
            email : email,
            password : hashpass,
            address : address
        });

        await newUser.save();
        return res.status(200)
        .json({message : "SignUp successfull"});

    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
});
//log-in

router.post("/log-in" , async(req, res)=>{
    try{     
        const {username , password} = req.body;
        const existuser = await User.findOne({username:username});
        if(!existuser){
            return res.status(400)
            .json({message:"Username doesn't exist"});
        }
        const isValid = await bcrypt.compare(password , existuser.password);
        if(!isValid){
            return res.status(400).json({message : "Password is incorrect"});
        }
        const authClaims =[
            {
                username : existuser.username,
                role : existuser.role,
            }];
        const token = jwt.sign({authClaims} , "secretkey", {expiresIn: "2d"});
        return res.status(200).json({id:existuser._id , role : existuser.role , token : token});
    }catch(err){
        res.status(500).json({message:"Internal server Error"});
    }
});



//get user information
router.get("/get-user-info",authentication,  async(req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        // console.log(data);
        return res.status(200).json({data:data});

    }catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }

})
router.get('/get-user-info/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const data = await User.findById(id).select("-password");
        return res.status(200).json({data:data});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
})

// put - update all
// patch - updates specific
//update description
router.put("/update-address" , async(req,res)=>{
    try{
        const id = req.headers.id;
        const {address} = req.body; 
        await User.findByIdAndUpdate(id , {address:address});
        return res.status(200).json({message:"updated successfully"});

    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
})
export {router};
