import { Request, Response } from "express"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"
import path from 'path'

export class FindByIdProductImageController{
    
    constructor(
        private findByIdProductUseCase: FindByIdProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params

        const product = await this.findByIdProductUseCase.execute(id)

        if(!product || !product.image) return response.json({ message: "This product does not exist or have an image"})
        return response.sendFile(`${path.join(__dirname+"../"+"../"+"../"+"../")}public/` + product.image)
        
    }
}