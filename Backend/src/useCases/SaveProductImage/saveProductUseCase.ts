import { IProductRepository } from "../../repositories/IProductRepository"
import { Product } from "../../types/Product"


export class SaveImageUseCase {

    constructor(
        private productRepository: IProductRepository
    ) { }

    async execute(id: string, buffer: string) {
        console.log(buffer)
        const product = await this.productRepository.findById(id) as Product
        const newProduct = {
            ...product,
            image: buffer
        }
        await this.productRepository.update(newProduct, id)
        return
    }
}

