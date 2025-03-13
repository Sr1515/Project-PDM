import { Supplier } from "../types/Supplier"

export interface ISupplierRepository {
    save(supplier:Supplier): Promise<unknown>
    findAll(): Promise<Supplier[]>
    findById(id: string): Promise<Supplier | null>
    findByEmail(email: string): Promise<Supplier | null>
    findBySupplierId(supplier_id: string): Promise<Supplier[]>
    remove(id: string): Promise<void>
    update(supplier: Supplier, id: string): Promise<unknown>
}