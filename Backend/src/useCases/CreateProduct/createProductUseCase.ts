import { IProductRepository } from "../../repositories/IProductRepository"
import { Product } from "../../types/Product"
//import { IProductRequestDTO } from "./createProductDTO"

export class CreateProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(data: any) {
        const product = new Product(data)
        return await this.productRepository.save(product)
    }
}