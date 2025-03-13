import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { UpdateSupplierController } from "./updateSupplierController"
import { UpdateSupplierUseCase } from "./updateSupplierUseCase"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)

const updateSupplierController = new UpdateSupplierController(updateSupplierUseCase)

export { updateSupplierUseCase, updateSupplierController }