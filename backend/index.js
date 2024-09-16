const express = require('express')
const User =require("./Users")
const Products= require("./Products")
require("./config")
const cors =require("cors")
const jsonwebtoken=require("jsonwebtoken")
const jwtKey ="e-comm"

const app = express()
app.use(cors())
app.use(express.json())
app.post("/register",async(req,res)=>{
    console.log(req.body)
   const data= new User(req.body)
   const result = await data.save()
   console.log('result',result)
   if(result){
    jsonwebtoken.sign({User},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("no results found")
        }
        res.send({result,token})
    })
   }
})
app.post("/login",async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
    const loginUser = await User.findOne(req.body).select("-password")
    
 
    if(loginUser){
        jsonwebtoken.sign({User},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send("no results found")
            }
            res.send({loginUser,token})
        })
    }else{
        res.send("no results found")
    }}else{
        res.send("no results found")

    }
})
app.post('/addproducts',async(req,res)=>{
    console.log('req.body',req.body)
    const product =  new Products(req.body)
    const result = await product.save()
    res.send(result)
})
app.get('/products',async(req,res)=>{
    const product = await Products.find();
  if(product.length){
    res.send(product)
  }else {
    res.send("no results found")
  }
})
app.delete('/deleteproduct/:id',async(req,res)=>{
   console.log(req.params.id)
   
   const result = await Products.deleteOne({_id:req.params.id})
   res.send(result)
})
app.listen(5500)