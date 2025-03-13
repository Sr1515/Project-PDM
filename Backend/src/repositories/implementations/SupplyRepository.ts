import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../ISupplyRepository"
import SupplyModel from "../../database/models/Supply"
import ProductModel from "../../database/models/Product"
import PersonModel from "../../database/models/Person"

export class SupplyRepository implements ISupplyRepository {
    
    async findById(id: string): Promise<Supply | null> {
        const result: Supply | null = await SupplyModel.findOne({_id: id})
        return result
    }
    async findAll(): Promise<Supply[]> {
        const result = await SupplyModel.find()
        const supplies: Supply[] = []
        result.forEach((supply: any) => {
            supplies.push(supply)
        })
        return supplies
    }

    async findBySupplierId(supplier_id: string): Promise<any[]> {
        const result = await SupplyModel.find({supplier_id})
        const supplies: any[] = []

        for (const supply of result){
            const person = await PersonModel.findOne({_id: supply.person_id})
            const products = []
            for (const product of supply.products){
                const productData = await ProductModel.findOne({_id: product.product_id})
                products.push({
                    product: productData,
                    quantity: product.quantity
                })
            }
            supplies.push({
                _id: supply._id,
                person: person,
                products: products
            })
        }

        return supplies
    }
    
    async save(supply: Supply): Promise<unknown> {
        const supplyCreated = await SupplyModel.create({...supply})

        return supplyCreated
    }

    async remove(id: string): Promise<void> {
        await SupplyModel.deleteOne({
            _id: id
        })
    }

    async update(supply: Supply, id: string): Promise<unknown> {
        const supplyUpdated = await SupplyModel.findOneAndUpdate({_id: id})

        return supplyUpdated
    }

}