import { Request, Response } from "express"
import { FindAllSuppliesUseCase } from "./findAllSuppliesUseCase"

export class FindAllSuppliesController{

    constructor(
        private findAllSuppliesUseCase: FindAllSuppliesUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {

        const id = request.body.userId
        const supplies = await this.findAllSuppliesUseCase.execute(id)
        return reponse.json(supplies)

    }
}