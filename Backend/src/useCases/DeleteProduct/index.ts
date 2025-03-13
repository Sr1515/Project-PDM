import { ProductRepository } from "../../repositories/implementations/ProductRepository" 
import { DeleteProductController } from "./deleteProductController" 
import { DeleteProductUseCase } from "./deleteProductUseCase" 
import sequelize from "../../database/index"

const productRepository = new ProductRepository(sequelize)

const deleteProductUseCase = new DeleteProductUseCase(productRepository)

const deleteProductController = new DeleteProductController(deleteProductUseCase)

export { deleteProductController, deleteProductUseCase }