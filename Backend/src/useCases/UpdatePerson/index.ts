import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { CreatePersonController } from "./updatePersonController"
import { UpdatePersonUseCase } from "./updatePersonUseCase"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)

const updatePersonUseCase = new UpdatePersonUseCase(personRepository)

const updatePersonController = new CreatePersonController(updatePersonUseCase)

export { updatePersonUseCase, updatePersonController }