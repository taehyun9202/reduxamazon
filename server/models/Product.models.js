const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type:String
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    img:{
        type: String,
    },
    price:{
        type: Number
    },
    options: [{ 
        type : Array,
    }],
    description:{
        type:String,
    },
    rating:{
        type:Number,
        default: 0
    },
    inStock:{
        type:Number
    },
    isSold:{
        type:Number,
        default: 0
    },
})

module.exports = mongoose.model("Product", ProductSchema)