import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindByIdProductImageController } from "./findByIdImageController"
import { FindByIdProductUseCase } from "./findByIdImageUseCase"
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)

const findByIdSupplierUseCase = new FindByIdProductUseCase(productRepository)

const findByIdProductImageController = new FindByIdProductImageController(findByIdSupplierUseCase)

export { findByIdProductImageController, findByIdSupplierUseCase}