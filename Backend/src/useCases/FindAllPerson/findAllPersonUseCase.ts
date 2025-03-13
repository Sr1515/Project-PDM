import { IPersonRepository } from "../../repositories/IPersonRepository"


export class FindAllPersonsUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(id: string) {
        const persons = await this.personRepository.findBySupplierId(id)
        return persons
    }
}