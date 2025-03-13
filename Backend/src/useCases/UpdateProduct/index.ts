import { ProductRepository } from "../../repositories/implementations/ProductRepository" 
import { UpdateProductController } from "./updateProductController" 
import { UpdateProductUseCase } from "./updateProductUseCase" 

const productRepository = new ProductRepository()

const updateProductUseCase = new UpdateProductUseCase(productRepository)

const updateProductController = new UpdateProductController(updateProductUseCase)

export { updateProductUseCase, updateProductController }