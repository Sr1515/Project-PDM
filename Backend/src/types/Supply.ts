export class Supply {
    public readonly id!: string
    public products!: Array<{product_id: string, quantity: number }>
    public supplier_id!: string
    public person_id!: string
    
    constructor(props: Omit<Supply, "id">, id?: string) {
        Object.assign(this, props)
        if (id) {
            this.id = id
        }
    }
}