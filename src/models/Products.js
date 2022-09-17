//import {Schema, model} from "mongoose";
import pkg from 'mongoose';
const {Schema, model} = pkg;

const productSchema = new Schema({
    name: String,
    category: String,
    price: String,
    imgURL: String,
},{
    timestamps: true,
    versionKey: false
})

export default model('products', productSchema);