import { z } from "zod"

export const UpdatePersonDTO = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
    }).optional(),
    address: z.object({type: z.string(), coordinates: z.array(z.number()), crs: z.any().optional() }).optional(),
    contact: z.string().optional(),
    image: z.string().optional(),
    register: z.object({ type: z.string(), value: z.string() }).optional(),
    email: z.string().email().optional()
})