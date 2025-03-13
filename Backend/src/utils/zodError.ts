import { ZodIssue } from "zod"

export function generateMessage(error: ZodIssue){
    return `${error.code} to ${error.path.join(" > ")}; ${error.message}`
}

export function generateMessageArray(errors: {issues: []}){
    return errors.issues.map((error: ZodIssue) => {
        return generateMessage(error)
    })
}