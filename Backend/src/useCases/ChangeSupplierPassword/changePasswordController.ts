import { Request, Response } from "express"
import { z } from "zod"
import { ChangePasswordUseCase } from "./changePasswordUseCase"
import { ChangePasswordDTO } from "./changePasswordDTO"
import { generateMessageArray } from "../../utils/zodError"

export class ChangePasswordController{
    
    constructor(
        private changePasswordUseCase: ChangePasswordUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            const {id} = request.params

            ChangePasswordDTO.parse(request.body)

            const data:z.infer<typeof ChangePasswordDTO> = request.body

            await this.changePasswordUseCase.execute(data.oldPassword,data.newPassword, id)

            return response.json("ok")
        }
        catch(err:any){
            if(err.issues) {
                const message = generateMessageArray(err)
                return response.status(400).json({errors: message}) 
            }
            return response.status(400).json({error: err.message})
        }
    }
}