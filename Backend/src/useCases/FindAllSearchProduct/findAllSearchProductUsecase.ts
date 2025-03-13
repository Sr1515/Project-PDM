import { IProductRepository } from "../../repositories/IProductRepository"


export class FindAllSearchProductsUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string, search: string) {
        const products = await this.productRepository.findAllSearch(id, search)
        return products
    }
}