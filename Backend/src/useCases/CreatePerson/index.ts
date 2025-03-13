import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { CreatePersonController } from "./createPersonController"
import { CreatePersonUseCase } from "./createPersonUseCase"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)
const createPersonUseCase = new CreatePersonUseCase(personRepository)
const createPersonController = new CreatePersonController(createPersonUseCase)

export { createPersonUseCase, createPersonController }

