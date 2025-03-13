import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { FindByIdPersonController } from "./findByIdControllerController"
import { FindByIdPersonUseCase } from "./findByIdPersonUseCase"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)

const findByIdPersonUseCase = new FindByIdPersonUseCase(personRepository)

const findByIdPersonController = new FindByIdPersonController(findByIdPersonUseCase)

export { findByIdPersonController, findByIdPersonUseCase }