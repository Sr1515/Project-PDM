import { Request, Response } from "express"
import { Product } from "../../types/Product"
import { FindByIdProductUseCase } from "./findByIdProductUseCase"

export class FindByIdProductController{
    
    constructor(
        private findByIdProductUseCase: FindByIdProductUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        const product: Product | null = await this.findByIdProductUseCase.execute(id)
        return reponse.json(product)
        
    }
}