import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { DeleteSupplierController } from "./deleteSupplierController"
import { DeleteSupplierUseCase } from "./deleteSupplierUseCase"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)
const deleteSupplierUseCase = new DeleteSupplierUseCase(supplierRepository)
const deleteSupplierController = new DeleteSupplierController(deleteSupplierUseCase)

export { deleteSupplierController, deleteSupplierUseCase } 