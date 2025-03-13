import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { DeletePersonController } from "./deletePersonController"
import { DeletePersonUseCase } from "./deletePersonUseCase"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)

const deletePersonUseCase = new DeletePersonUseCase(personRepository)

const deletePersonController = new DeletePersonController(deletePersonUseCase)

export { deletePersonController, deletePersonUseCase }