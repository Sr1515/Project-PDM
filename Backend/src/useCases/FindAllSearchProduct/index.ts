import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindAllSearchProductsController } from "./findAllSearchProductController"
import { FindAllSearchProductsUseCase } from "./findAllSearchProductUsecase"

const productRepository = new ProductRepository()

const findAllSearchProductsUseCase = new FindAllSearchProductsUseCase(productRepository)
const findAllSearchProductsController = new FindAllSearchProductsController(findAllSearchProductsUseCase)

export { findAllSearchProductsController, findAllSearchProductsUseCase }
