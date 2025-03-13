import { z } from "zod"

export const UpdateSupplyDTO = z.object({
    product_id: z.string({
        invalid_type_error: "Product must be a string",
    }).optional(),
    supplier_id: z.string({
        invalid_type_error: "Supplier must be a string",
    }).optional(),
    person_id: z.string({
        invalid_type_error: "Person must be a string",
    }).optional(),
})