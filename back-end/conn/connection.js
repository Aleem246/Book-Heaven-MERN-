import mongoose from "mongoose";
const connect = async()=>{
    try{
       const conn =  await mongoose.connect(`${process.env.URL}`);
        console.log(`mongoose connected ${conn.connection.host}`);
    }
    catch(err){
    console.log(`Error : ${err.message}`);
    }
}

export default connect;