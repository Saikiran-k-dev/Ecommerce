import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    quantity:{
        type:Number
    }
})



