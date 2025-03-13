import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { CreateProductUseCase } from "./createProductUseCase"
import { CreateProductController } from "./createProductController"
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)

const createProductUseCase = new CreateProductUseCase(productRepository)

const createProductController = new CreateProductController(createProductUseCase)

export { createProductUseCase, createProductController }
