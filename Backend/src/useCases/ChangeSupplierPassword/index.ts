import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"
import { ChangePasswordUseCase } from "./changePasswordUseCase"
import { ChangePasswordController } from "./changePasswordController"
import sequelize from "../../database/index"

const supplierRepository = new SupplierRepository(sequelize)

const changePasswordUseCase = new ChangePasswordUseCase(supplierRepository)

const changePasswordController = new ChangePasswordController(changePasswordUseCase)

export { changePasswordUseCase, changePasswordController }