import { z } from "zod"
import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
import { UpdateSupplierDTO } from "./updateSupplierDTO"

export class UpdateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(data :z.infer<typeof UpdateSupplierDTO>, id: string) {
        const supplier = await this.supplierRepository.findById(id) as Supplier
        const newSupplier: Supplier = {
            id: supplier.id,
            name: data.name || supplier.name,
            geolocalization: data.geolocalization || supplier.geolocalization,
            image: data.image || supplier.image,
            password: supplier.password
        }

        await this.supplierRepository.update(newSupplier, id)

        return newSupplier
    }
}