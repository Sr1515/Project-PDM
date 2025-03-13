import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindByIdSupplierController } from "./findByIdSupplierController"
import { FindByIdSupplierUseCase } from "./findByIdSupplierUseCase"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const findByIdSupplierUseCase = new FindByIdSupplierUseCase(supplierRepository)

const findByIdSupplierController = new FindByIdSupplierController(findByIdSupplierUseCase)

export { findByIdSupplierController, findByIdSupplierUseCase}