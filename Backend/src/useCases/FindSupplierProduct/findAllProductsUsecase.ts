import { IProductRepository } from "../../repositories/IProductRepository"


export class FindAllProductsUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(supplier_id: string) {
        const products = await this.productRepository.findBySupplierId(supplier_id)
        return products
    }
}