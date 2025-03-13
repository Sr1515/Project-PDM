import { Request, Response } from "express"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"
import  path  from "path"

export class FindByIdSupplierImageController{
    
    constructor(
        private findByIdSupplierUseCase: FindByIdSupplierUseCase,
    ) {}

    async handle (request: Request, response: Response) {
        const { id } = request.params
        const supplier = await this.findByIdSupplierUseCase.execute(id)
        if(!supplier || !supplier.image) return response.json({ message: "This supplier does not exist or have an image"})
        return response.sendFile(`${path.join(__dirname+"../"+"../"+"../"+"../")}public/` + supplier.image)
        
    }
}