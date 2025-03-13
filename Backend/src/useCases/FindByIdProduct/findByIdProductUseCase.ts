import { IProductRepository } from "../../repositories/IProductRepository"


export class FindByIdProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(id: string) {
        const product = await this.productRepository.findById(id)
        return product
    }
}