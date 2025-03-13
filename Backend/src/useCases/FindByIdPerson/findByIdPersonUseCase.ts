import { IPersonRepository } from "../../repositories/IPersonRepository"


export class FindByIdPersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(id: string) {
        const person = await this.personRepository.findById(id)
        return person
    }
}