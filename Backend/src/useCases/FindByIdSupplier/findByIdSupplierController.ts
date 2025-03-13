import { Request, Response } from "express"
import { Supplier } from "../../types/Supplier"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"

export class FindByIdSupplierController{
    
    constructor(
        private findByIdSupplierUseCase: FindByIdSupplierUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.body.userId
        const person: Supplier | null = await this.findByIdSupplierUseCase.execute(id)
        return reponse.json(person)
        
    }
}