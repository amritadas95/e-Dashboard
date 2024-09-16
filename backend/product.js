const {mongoose} = require("mongoose")
const ProductSchema=new mongoose.Schema({})
const product=mongoose.model("Products",ProductSchema)
const data=await product.find()
