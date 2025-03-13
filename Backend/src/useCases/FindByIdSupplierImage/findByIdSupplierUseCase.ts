import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"


export class FindByIdSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string): Promise<Supplier | null> {
        const supplier = await this.supplierRepository.findById(id)
        return supplier
    }
}