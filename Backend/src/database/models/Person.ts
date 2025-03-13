import mongoose from "mongoose"
import { Schema } from "mongoose"

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    register: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    address: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    contact: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Person = mongoose.model("Person", PersonSchema)

export default Person