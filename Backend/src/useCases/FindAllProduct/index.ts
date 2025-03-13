import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"
import { FindAllProductsController } from "./findAllProductsController"
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)
const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
const findAllProductsController = new FindAllProductsController(findAllProductsUseCase)

export { findAllProductsController, findAllProductsUseCase }