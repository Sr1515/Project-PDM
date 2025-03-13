import ProductModel from "../../database/models/Product"
import { Product } from "../../types/Product"
import { IProductRepository } from "../IProductRepository"

export class ProductRepository implements IProductRepository {
    async findAllSearch(supplier_id: string, search: string ): Promise<Product[]> {
        console.log(search)
        console.log(supplier_id)
        const result = await ProductModel.find({
            $and: [
                {
                    $text: {$search: search}
                },
                {
                    supplier_id
                }
            ]
        }) as Product[]
        return result
    }

    async findBySupplierId(supplier_id: string): Promise<Product[]> {
        const result = await ProductModel.find({
            supplier_id
        })
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async findById(id: string): Promise<Product | null> {
        const result: Product | null = await ProductModel.findOne({_id: id})
        return result
    }

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.find()
        const products: Product[] = []
        result.forEach((product: any) => {
            products.push(product)
        })
        return products
    }
    
    async save(product: Product): Promise<unknown> {
        
        const productCreated = await ProductModel.create({
            ...product
        })

        return productCreated
    }

    async remove(_id: string): Promise<void> {
        await ProductModel.deleteOne({
            _id
        })
    }

    async update(product: Product, _id: string): Promise<unknown> {
        const productUpdated = await ProductModel.findOneAndUpdate({_id}, {
            name: product.name,
            description: product.description,
            ammount: product.ammount,
            type: product.type,
            price: product.price,
            manufacturing_date: product.manufacturing_date,
            expiration_date: product.expiration_date,
            image: product.image,
            supplier_id: product.supplier_id
        })

        return productUpdated
    }
}