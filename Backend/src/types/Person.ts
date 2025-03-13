export class Person {
    public readonly id!: string
    public name!: string
    public email!: string
    public address: object | undefined
    public contact: string[] | undefined

    constructor(props: Omit<Person, "id">, id?: string) {
        Object.assign(this, props)
        if(id){
            this.id = id
        }
    }
}