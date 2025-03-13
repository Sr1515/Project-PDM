import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindByIdSupplierImageController } from "./findByIdSupplierController"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const findByIdSupplierUseCase = new FindByIdSupplierUseCase(supplierRepository)

const findByIdSupplierImageController = new FindByIdSupplierImageController(findByIdSupplierUseCase)

export { findByIdSupplierImageController, findByIdSupplierUseCase}