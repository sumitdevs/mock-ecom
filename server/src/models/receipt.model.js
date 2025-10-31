import { Schema, model } from "mongoose";

const receiptSchema = Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    total:{type:Number, required:true},
},{timestamps:true});

const Receipt = model("Receipt",receiptSchema);

export default Receipt;