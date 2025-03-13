import { Application } from "express"
import personRoutes from "./person.routes"
import productRoutes from "./product.routes"
import supplierRoutes from "./supplier.routes"
import supplyRoutes from "./supply.routes"
import authRoutes from "./auth.routes"

const routes = (app: Application) => {
    personRoutes(app)
    productRoutes(app)
    supplierRoutes(app)
    supplyRoutes(app)
    authRoutes(app)
}

export default routes