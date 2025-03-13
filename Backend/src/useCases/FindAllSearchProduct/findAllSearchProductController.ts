import { Request, Response } from "express"
import { FindAllSearchProductsUseCase } from "./findAllSearchProductUsecase"


export class FindAllSearchProductsController{

    constructor(
        private findAllProductsUseCase: FindAllSearchProductsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const {search} = request.query
        const id = request.body.userId
        const products = await this.findAllProductsUseCase.execute(id, search as string)
        return reponse.json(products)

    }
}