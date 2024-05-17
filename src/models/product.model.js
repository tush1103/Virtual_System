import mongoose from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
})

export default mongoose.model("Product",productSchema)