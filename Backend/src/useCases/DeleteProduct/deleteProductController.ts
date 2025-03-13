import { Request, Response } from "express"
import { DeleteProductUseCase } from "./deleteProductUseCase"

export class DeleteProductController{
    
    constructor(
        private deleteProductUseCase: DeleteProductUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        const supplier_id = request.body.userId

        await this.deleteProductUseCase.execute(id, supplier_id)
        
        return response.status(200).json("ok")
        
    }
}