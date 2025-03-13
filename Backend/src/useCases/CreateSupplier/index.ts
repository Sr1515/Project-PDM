import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { CreateSupplierUseCase } from "./createSupplierUseCase"
import { CreateSupplierController } from "./createSupplierController"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

const createSupplierController = new CreateSupplierController(createSupplierUseCase)

export { createSupplierUseCase, createSupplierController}
