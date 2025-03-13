import { ISupplierRepository } from "../../repositories/ISupplierRepository"
import { Supplier } from "../../types/Supplier"
import {hash} from "bcryptjs"
//import { ISupplierRequestDTO } from "./createSupplierDTO"

export class CreateSupplierUseCase {

    constructor(
        private supplierRepository: ISupplierRepository
    ) {}

    async execute(data: any) {

        const password = await hash(data.password, 8)

        const supplier = new Supplier({
            ...data,
            password,
            image: data.image || ""
        })

        return await this.supplierRepository.save(supplier)
    }
}