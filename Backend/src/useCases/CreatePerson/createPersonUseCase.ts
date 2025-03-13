import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
//import { IPersonRequestDTO } from "./createPersonDTO"

export class CreatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(data: any) {
        console.log(data)

        const person = new Person({
            ...data
        })

        console.log(person)

        const result = await this.personRepository.save(person)

        return result
    }
}