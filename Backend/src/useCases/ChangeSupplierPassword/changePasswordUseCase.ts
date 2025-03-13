import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import bcrypt from "bcryptjs"
import { Supplier } from "../../types/Supplier"

export class ChangePasswordUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    
    async execute(oldPassword: string, newPassword: string, id: string) {
        const supplier = await this.supplierRepository.findById(id) as Supplier

        const passwordMatch = await bcrypt.compare(oldPassword, supplier.password)

        if(!passwordMatch) {
            throw new Error("Old password dont match")
        }

        const password = await bcrypt.hash(newPassword, 8)

        const newSupplier: Supplier = {
            ...supplier,
            password
        }

        await this.supplierRepository.update(newSupplier, id)
    }
}