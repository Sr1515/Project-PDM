import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { FindAllSuppliersUseCase } from "./findAllSupplierUseCase"
import { FindAllSupplierController } from "./findAllSuppliersController"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)
const findAllSuppliersUseCase = new FindAllSuppliersUseCase(supplierRepository)
const findAllSuppliersController = new FindAllSupplierController(findAllSuppliersUseCase)

export { findAllSuppliersController, findAllSuppliersUseCase}