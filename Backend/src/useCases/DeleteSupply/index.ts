import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { DeleteSupplyController } from "./deleteSupplyController"
import { DeleteSupplyUseCase } from "./deleteSupplyUseCase"

const supplyRepository = new SupplyRepository()
const deleteSupplyUseCase = new DeleteSupplyUseCase(supplyRepository)
const deleteSupplyController = new DeleteSupplyController(deleteSupplyUseCase)

export { deleteSupplyController, deleteSupplyUseCase }