import { Request, Response } from "express"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"

export class FindSupplierProductsController{

    constructor(
        private findAllProductsUseCase: FindAllProductsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const supplier_id = request.body.userId

        const products = await this.findAllProductsUseCase.execute(supplier_id)

        return reponse.json(products)

    }
}