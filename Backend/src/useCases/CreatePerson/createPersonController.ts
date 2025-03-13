import { Request, Response } from "express"
import { CreatePersonUseCase } from "./createPersonUseCase"
import { CreatePersonDTO } from "./createPersonDTO"
import { z} from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreatePersonController{
    
    constructor(
        private createPersonUseCase: CreatePersonUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            CreatePersonDTO.parse(request.body)
            const data:z.infer<typeof CreatePersonDTO> = request.body


            const personCreated: any = await this.createPersonUseCase.execute({
                ...data
            })


            return response.status(201).json({
                id: personCreated.id,
                name: personCreated.name,
                email: personCreated.email,
                address: personCreated.address,
                contact: personCreated.contact,
                register: personCreated.register,
            })
        }
        catch (err:any) {
            const message = generateMessageArray(err)
            return response.status(400).json({errors: message})
        }
        
    }
}