import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { UpdateSupplyController } from "./updateSupplyController"
import { UpdateSupplyUseCase } from "./updateSupplyUseCase"
import sequelize from "../../database/index"

const supplyRepository = new SupplyRepository(sequelize)
const updateSupplyUseCase = new UpdateSupplyUseCase(supplyRepository)
const updateSupplyController = new UpdateSupplyController(updateSupplyUseCase)

export { updateSupplyUseCase, updateSupplyController }