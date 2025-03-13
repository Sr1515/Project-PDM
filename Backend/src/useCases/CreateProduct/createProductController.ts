import { Request, Response } from "express"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductDTO } from "./createProductDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class CreateProductController{
    
    constructor(
        private createProductUseCase: CreateProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            const id = request.body.userId

            CreateProductDTO.parse(request.body)

            const data:z.infer<typeof CreateProductDTO> = request.body

            const result:any = await this.createProductUseCase.execute({
                ...data,
                supplier_id: id
            })

            return response.status(201).json({
                id: result._id,
                name: result.name,
                description: result.description,
                price: result.price,
                manufacturing_date: result.manufacturing_date,
                expiration_date: result.expiration_date,
                ammount: result.ammount,
                type: result.type
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