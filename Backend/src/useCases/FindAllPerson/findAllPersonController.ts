import { Request, Response } from "express"
import { FindAllPersonsUseCase } from "./findAllPersonUseCase"
import { Person } from "../../types/Person"

export class FindAllPersonController{
    
    constructor(
        private findAllPersonUseCase: FindAllPersonsUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const supplier_id = request.body.userId
        const persons: Person[] = await this.findAllPersonUseCase.execute(supplier_id)
        return reponse.json(persons)
    }
}