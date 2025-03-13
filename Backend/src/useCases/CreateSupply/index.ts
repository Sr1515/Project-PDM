import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { CreateSupplyController } from "./createSupllyController"
import { CreateSupplyUseCase } from "./createSupplyUseCase"
import sequelize from "../../database/index"

const supplyRepository = new SupplyRepository(sequelize)

const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)

const createSupplyController = new CreateSupplyController(createSupplyUseCase)

export { createSupplyUseCase, createSupplyController}