import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindByIdProductController } from "./findByIdProductController"
import { FindByIdProductUseCase } from "./findByIdProductUseCase"
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)

const findByIdProductUseCase = new FindByIdProductUseCase(productRepository)

const findByIdProductController = new FindByIdProductController(findByIdProductUseCase)

export { findByIdProductController, findByIdProductUseCase }