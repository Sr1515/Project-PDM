import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { FindAllSuppliesUseCase } from "./findAllSuppliesUseCase"
import { FindAllSuppliesController } from "./findAllSuppliesController"
import sequelize from "../../database/index"

const supplyRepository = new SupplyRepository(sequelize)
const findAllSuppliesUseCase = new FindAllSuppliesUseCase(supplyRepository)
const findAllSuppliesController = new FindAllSuppliesController(findAllSuppliesUseCase)

export { findAllSuppliesController, findAllSuppliesUseCase }