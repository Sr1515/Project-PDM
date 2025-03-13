import { Person } from "../types/Person"

export interface IPersonRepository {
    save(person:Person): Promise<unknown>
    findAll(): Promise<Person[]>
    findById(id: string): Promise<Person | null>
    findByName(name: string): Promise<Person | null>
    findBySupplierId(supplier_id: string): Promise<Person[]>
    remove(id: string): Promise<void>
    update(person: Person, id: string): Promise<unknown>
}