import { Request, Response } from "express"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"

export class FindAllProductsController{

    constructor(
        private findAllProductsUseCase: FindAllProductsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const id = request.body.userId
        const products = await this.findAllProductsUseCase.execute(id)
        return reponse.json(products)

    }
}