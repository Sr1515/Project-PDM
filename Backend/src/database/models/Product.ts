import { Schema } from "mongoose"
import mongoose from "mongoose"

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ammount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    manufacturing_date: {
        type: Date,
        required: true
    },
    expiration_date: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    supplier_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

ProductSchema.index({name: "text", description: "text"}, {default_language: "pt", weights: {name: 2, description: 1}})

const Product = mongoose.model("Product", ProductSchema)

export default Product