import { z } from "zod"
import { IPersonRepository } from "../../repositories/IPersonRepository"
import { Person } from "../../types/Person"
import { UpdatePersonDTO } from "./updatePersonDTO"

export class UpdatePersonUseCase {

    constructor(
        private personRepository: IPersonRepository
    ) {}

    async execute(data: z.infer<typeof UpdatePersonDTO>, id: string) {
        const person = await this.personRepository.findById(id) as Person
        const newPerson: Person = {
            id: person.id,
            name: data.name || person.name,
            address: data.address || person.address,
            type: data.type || person.type,
            contact: data.contact || person.contact,
            password: person.password 
        }

        await this.personRepository.update(newPerson, id)

        return newPerson
    }
}