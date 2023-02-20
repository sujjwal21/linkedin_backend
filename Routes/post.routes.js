const express=require("express")
const { PsotModel } = require("../Models/Post.model")
const postRouter=express.Router()
postRouter.use(express.json())

postRouter.get("/",async(req,res)=>{
    const query=req.query
    try{
        const posts=await PsotModel.find(query)
        res.send({"msg":"All posts","post":posts})
    }catch(err){
        res.send({"msg":"error found","error":err})
    }
})
postRouter.get("/top",async(req,res)=>{
    try{
        const posts=await PsotModel.find().sort({"no_if_comments":-1})
        // console.log(posts[0])
        res.send({"msg":"All posts","post":posts[0]})
    }catch(err){
        res.send({"msg":"error found","error":err})
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const post=new PsotModel(payload)
        await post.save();
        res.send({"msg":"post has been created"})
    }catch(err){
        res.send({"msg":"error found","error":err})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const ID=req.params.id
    try{
        const post=await PsotModel.findByIdAndUpdate({"_id":ID},payload)
        res.send({"msg":"post has been updated"})
    }catch(err){
        res.send({"msg":"error found","error":err})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    try{
        const post=await PsotModel.findByIdAndDelete({_id:ID})
        res.send({"msg":"post has been deleted"})
    }catch(err){
        res.send({"msg":"error found","error":err})
    }
})

module.exports={
    postRouter
}