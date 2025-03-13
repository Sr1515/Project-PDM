import { Schema } from "mongoose"
import mongoose from "mongoose"

const SupplySchema = new Schema({
    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    person_id: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    products: {
        type: [{
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
})

export default mongoose.model("Supply", SupplySchema)