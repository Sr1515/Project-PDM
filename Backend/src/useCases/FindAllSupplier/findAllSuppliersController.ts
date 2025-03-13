import { Request, Response } from "express"
import { FindAllSuppliersUseCase } from "./findAllSupplierUseCase"

export class FindAllSupplierController{
    
    constructor(
        private findAllSuppliersUseCase: FindAllSuppliersUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const suppliers = await this.findAllSuppliersUseCase.execute()
        return reponse.json(suppliers)
        
    }
}