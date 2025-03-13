import { IPersonRepository } from "../../repositories/IPersonRepository"

export class DeletePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(id: string) {
        await this.personRepository.remove(id)
    }
}