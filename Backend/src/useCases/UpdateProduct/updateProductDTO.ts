import { z } from "zod"

export const UpdateProductDTO = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
    }).optional(),
    description: z.string().optional(),
    price: z.number({
        invalid_type_error: "Price must be a number",
    }).optional(),
    batch: z.string().optional(),
    manufacturing_date: z.string().optional(),
    expiration_date: z.string().optional(),
    image: z.string().optional(),
    ammount: z.number({
        invalid_type_error: "Ammount must be a number",
    }).optional(),
    type: z.string({
        invalid_type_error: "Type must be a string",
    }).optional(),
    supplier_id: z.string({
        invalid_type_error: "Supplier must be a string",
    }).optional(),
})