import { Request, Response } from "express"
import { UpdateSupplierUseCase } from "./updateSupplierUseCase"
import { UpdateSupplierDTO } from "./updateSupplierDTO"
import { z } from "zod"
import { generateMessageArray } from "../../utils/zodError"

export class UpdateSupplierController{

    constructor(
        private updateSupplierUseCase: UpdateSupplierUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        try {
            UpdateSupplierDTO.parse(request.body)
            const data:z.infer<typeof UpdateSupplierDTO> = request.body

            const id = request.body.userId
            const result = await this.updateSupplierUseCase.execute({
                ...data
            }, id)

            return response.status(200).json({
                id: result.id,
                name: result.name,
                geolocalization: result.geolocalization,
                image: result.image,
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