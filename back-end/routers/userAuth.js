import jwt from "jsonwebtoken";
const authentication = (req,res,next)=>{
    const authHeader = req.headers["authentication"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        return res.status(401).json({message:"Authentication Failed"});
    }
    jwt.verify(token , "secretkey" , (err , user)=>{
        if(err){
            console.log(err);
            return res.status(403).json({message: "Token expired , please login again"});
        }
        req.user = user;
        next();
    });
};
export {authentication};