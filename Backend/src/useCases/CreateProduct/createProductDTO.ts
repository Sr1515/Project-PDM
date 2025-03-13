import { z } from "zod"

export const CreateProductDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    description: z.string().optional(),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    batch: z.string().optional(),
    manufacturing_date: z.string().optional(),
    expiration_date: z.string().optional(),
    image: z.string().optional(),
    ammount: z.number({
        required_error: "Ammount is required",
        invalid_type_error: "Ammount must be a number",
    }),
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    })
})