import { Request, Response } from "express"
import { FindByIdSupplyUseCase } from "./findByIdSupplierUseCase"

export class FindByIdSupplyController{
    
    constructor(
        private findByIdSupplyUseCase: FindByIdSupplyUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        const person = await this.findByIdSupplyUseCase.execute(id)
        return reponse.json(person)
        
    }
}