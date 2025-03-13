import { ISupplierRepository } from "../../repositories/ISupplierRepository"


export class FindAllSuppliersUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute() {
        const suppliers = await this.supplierRepository.findAll()
        return suppliers
    }
}