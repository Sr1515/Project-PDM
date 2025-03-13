import { IProductRepository } from "../../repositories/IProductRepository"

export class DeleteProductUseCase {

    constructor(
        private productRepository: IProductRepository
    ) {}

    async execute(barcode: string, supplier_id: string) {
        const product = await this.productRepository.findById(barcode)
        if (product?.supplier_id !== supplier_id) throw new Error("You can't delete a product that is not yours")
        await this.productRepository.remove(barcode)
    }
}