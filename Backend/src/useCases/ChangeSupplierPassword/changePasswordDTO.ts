import { z } from "zod"

export const ChangePasswordDTO = z.object({
    oldPassword: z.string({
        required_error: "Old password is required",
        invalid_type_error: "Old password must be a string",
    }),
    newPassword: z.string({
        required_error: "New password is required",
        invalid_type_error: "New password must be a string",
    }),
})