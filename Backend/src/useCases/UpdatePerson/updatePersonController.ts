import { Request, Response } from "express"
import { UpdatePersonUseCase } from "./updatePersonUseCase"
import { UpdatePersonDTO } from "./updatePersonDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreatePersonController{
    
    constructor(
        private updatePersonUseCase: UpdatePersonUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            UpdatePersonDTO.parse(request.body)
            const data:z.infer<typeof UpdatePersonDTO> = request.body

            const id = request.params.id
            const personCreated: any = await this.updatePersonUseCase.execute({
                ...data
            }, id)

            return response.status(200).json({
                id: personCreated.id,
                name: personCreated.name,
                email: personCreated.email,
                address: personCreated.address,
                type: personCreated.type,
                contact: personCreated.contact
            })
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