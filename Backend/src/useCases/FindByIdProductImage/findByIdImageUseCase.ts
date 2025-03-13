import { IProductRepository } from "../../repositories/IProductRepository"
import fs from "fs"
import { Product } from "../../types/Product"


export class FindByIdProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id)
        return product
    }
}