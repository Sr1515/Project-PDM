import AuthenticateSupplier from "./authenticate"
import { SupplierRepository } from "../../repositories/implementations/SupplierRepository"

const supplierRepository = new SupplierRepository()

const authenticateSupplier = new AuthenticateSupplier(supplierRepository)

export { authenticateSupplier }