import { z } from "zod"


export const CreateSupplierDTO = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }),
    geolocalization: z.object({type: z.string(), coordinates: z.array(z.number()) }).optional(),
    image: z.string().optional(),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    })
})