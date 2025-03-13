import { ProductRepository } from "../../repositories/implementations/ProductRepository"
import { FindAllProductsUseCase } from "./findAllProductsUsecase"
import { FindSupplierProductsController } from "./findAllProductsController"

const productRepository = new ProductRepository()
const findSupplierProductsUseCase = new FindAllProductsUseCase(productRepository)
const findSupplierProductsController = new FindSupplierProductsController(findSupplierProductsUseCase)

export { findSupplierProductsController, findSupplierProductsUseCase }