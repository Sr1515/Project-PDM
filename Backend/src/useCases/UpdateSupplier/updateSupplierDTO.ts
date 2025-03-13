import { z } from "zod"

export const UpdateSupplierDTO = z.object({
    name: z.string({
        invalid_type_error: "Name must be a string",
    }).optional(),
    geolocalization: z.object({type: z.string(), coordinates: z.array(z.number()), crs: z.any().optional() }).optional(),
    image: z.string().optional(),
    password: z.string({
        invalid_type_error: "Password must be a string",
    }).optional()
})