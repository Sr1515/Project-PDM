import { ISupplierRepository } from "../../repositories/ISupplierRepository"


export class FindByIdSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(id: string) {
        const person = await this.supplierRepository.findById(id)
        return person
    }
}