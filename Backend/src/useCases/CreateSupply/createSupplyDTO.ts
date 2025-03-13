import { z } from "zod"

export const CreateSupplyDTO = z.object({
    products: z.array(z.object({product_id: z.string(), quantity: z.number()})),
    person_id: z.string({
        required_error: "Person is required",
        invalid_type_error: "Person must be a string",
    }),
})