import { SupplyRepository } from "../../repositories/implementations/SupplyRepository"
import { FindByIdSupplyController } from "./findByIdSupplierController"
import { FindByIdSupplyUseCase } from "./findByIdSupplierUseCase"

const supplyRepository = new SupplyRepository()

const findByIdSupplyUseCase = new FindByIdSupplyUseCase(supplyRepository)

const findByIdSupplyController = new FindByIdSupplyController(findByIdSupplyUseCase)

export { findByIdSupplyController, findByIdSupplyUseCase }