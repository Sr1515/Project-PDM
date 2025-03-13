import { PersonRepository } from "../../repositories/implementations/PersonRepository"
import { FindAllPersonController } from "./findAllPersonController"
import { FindAllPersonsUseCase } from "./findAllPersonUseCase"
import sequelize from "../../database/index"

const personRepository = new PersonRepository(sequelize)
const findAllPersonUseCase = new FindAllPersonsUseCase(personRepository)
const findAllPersonController = new FindAllPersonController(findAllPersonUseCase)

export {findAllPersonController, findAllPersonUseCase}