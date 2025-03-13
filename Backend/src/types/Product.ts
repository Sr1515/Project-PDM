export class Product {
    public readonly _id!: string 
    public name!: string
    public description: string | undefined
    public price!: number
    public manufacturing_date: string | undefined
    public expiration_date: string | undefined
    public image: string | undefined 
    public ammount!: number
    public type!: string
    public supplier_id!: string

    constructor(props: Omit<Product, "_id">, _id?: string) {
        Object.assign(this, props)

        if(_id){
            this._id = _id
        }
    }
}