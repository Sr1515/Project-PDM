import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { ISupplierRepository } from "../repositories/ISupplierRepository"
import { Supplier } from "../types/Supplier"
import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"


describe("Unit tests", () => {

    it("Deve criar um supplier", async () => {
        jest.mock('../repositories/implementations/SupplierRepository')
        let supplier: any = new SupplierRepository()
        supplier.save.mockReturnValue(5)
        console.log(supplier.save())
    })

})