import { ISupplierRepository } from "../../repositories/ISupplierRepository"

export class DeleteSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.supplierRepository.remove(id)
    }
}
