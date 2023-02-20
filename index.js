const express=require("express")
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { postRouter } = require("./Routes/post.routes");
const { Authentication } = require("./Middlewares/Authentication.middleware");
require("dotenv").config();

const app=express()
app.use(cors())
app.use("/users",userRouter)
app.use(Authentication)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to databse")
    }catch(err){
        console.log("database connection failed")
    }
    console.log(`Conneted on port ${process.env.port}`)
})