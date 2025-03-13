import { z } from "zod"

export const CreatePersonDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    address: z.object({type: z.string(), coordinates: z.array(z.number()) }).optional(),
    contact: z.string(),
    image: z.string().optional(),
    register: z.object({ type: z.string(), value: z.string() }).optional()
})