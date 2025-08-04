import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connect from "./conn/connection.js";
import { router as userRouter } from "./routers/user.js"
import { router as bookRouter} from "./routers/book.js";
import { router as cartRouter } from "./routers/cart.js"
import {router as orderRouter } from "./routers/order.js"
import { router as favouriteRouter} from "./routers/favourite.js"; // Assuming you have a favourite router
const app = express();
dotenv.config(); //loads .env file to process

app.use(express.json()); //middleware to parse json data from client
app.use(cors());   //comm. b/w front - back

app.use("/api/v1/", userRouter)
app.use("/api/v1", bookRouter)
app.use("/api/v1/", favouriteRouter) 
app.use("/api/v1/" , cartRouter)
app.use("/api/v1/", orderRouter)
app.use(cors({
  origin: ["https://book-heaven-mern.netlify.app"]
}));

const port = process.env.PORT;

app.get("/",async(req, res)=>{
    res.send("hello from back-end");
});
 
app.listen(port , ()=>{
    console.log("http://localhost:"+port);
    console.log("Server is Running...at "+port);
    connect();  
});

// base: < 480px
// sm: ≥ 480px
// md: ≥ 768px
// lg: ≥ 992px
// xl: ≥ 1280px
// 2xl: ≥ 1536px

// import {useSelector , useDispatch} from "react-redux";
//dispatch(authActions.login()); -->for changing the state
// useSelector((state)=>state.auth.isLoggedIn); -->for accessing
// localStorage.setItem("id" , response.data.id); -->for storing data in localstorage
// localStorage.getItem('id');  -->for getting data from localstorage
// localStorage.clear();    -->for clearing localstorage 

// const handleChange = (e)=>{
//         const {name , value} = e.target;
//         setBookdata({...bookdata , [name] : value});
//     }


// Method	Can send body in 2nd param?	        How to send body correctly
// POST	        ✅ Yes                          axios.post(url, body, { headers })
// PUT      	✅ Yes	                       axios.put(url, body, { headers })
// PATCH    	✅ Yes	                       axios.patch(url, body, { headers })
// DELETE   	❌ No                          ❗ Must use { data: body } in 2nd param:
// axios.delete(url, { headers, data: body })
