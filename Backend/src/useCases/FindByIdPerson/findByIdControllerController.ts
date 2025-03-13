import { Request, Response } from "express"
import { Person } from "../../types/Person"
import { FindByIdPersonUseCase } from "./findByIdPersonUseCase"

export class FindByIdPersonController{
    
    constructor(
        private findByIdPersonUseCase: FindByIdPersonUseCase,
    ) {}

    async handle (request: Request, reponse: Response) {
        const { id } = request.params
        const person: Person | null = await this.findByIdPersonUseCase.execute(id)
        return reponse.json(person)
        
    }
}