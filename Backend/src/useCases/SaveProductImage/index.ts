import { ProductRepository } from "../../repositories/implementations/ProductRepository";
import { SaveImageController } from "./saveProductController";
import { SaveImageUseCase } from "./saveProductUseCase";

const productRepository = new ProductRepository()
const saveImageProduct = new SaveImageUseCase(productRepository)
const saveProductImageController = new SaveImageController(saveImageProduct)

export {saveProductImageController}