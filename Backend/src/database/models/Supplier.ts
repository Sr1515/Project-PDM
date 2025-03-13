import { Schema } from "mongoose"
import mongoose from "mongoose"

const SupplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    geolocalization: {
        type: {
            type: String,
            enum: ["Point"],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", SupplierSchema)
export default Supplier