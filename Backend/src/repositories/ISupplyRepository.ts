import { Supply } from "../types/Supply"

export interface ISupplyRepository {
    save(supply: Supply): Promise<unknown>
    findAll(): Promise<Supply[]>
    findBySupplierId(supplier_id: string): Promise<any[]>
    findById(id: string): Promise<Supply | null>
    remove(id: string): Promise<void>
    update(supply: Supply, id: string): Promise<unknown>
}