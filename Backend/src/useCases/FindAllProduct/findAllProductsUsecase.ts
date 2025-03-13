import { IProductRepository } from "../../repositories/IProductRepository"


export class FindAllProductsUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string) {
    
        const products = await this.productRepository.findBySupplierId(id)
        return products
    }
}