import { Application } from "express"
import { createSupplierController } from "../useCases/CreateSupplier/"
import { findAllSuppliersController } from "../useCases/FindAllSupplier"
import { findByIdSupplierController } from "../useCases/FindByIdSupplier"
import { deleteSupplierController } from "../useCases/DeleteSupplier"
import { updateSupplierController } from "../useCases/UpdateSupplier"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { findByIdSupplierImageController } from "../useCases/FindByIdSupplierImage"
import { upload } from "../utils/multer"


const supplierRoutes = (app: Application) => {
    app.post("/supplier", (request, response) => createSupplierController.handle(request, response))
    app.get("/supplier", (request, response) => findAllSuppliersController.handle(request, response))
    app.get("/supplier/:id", (request, response) => findByIdSupplierController.handle(request, response))
    app.get("/supplier-image/:id", (request, response) => findByIdSupplierImageController.handle(request, response))
    app.delete("/supplier", EnsureAuthenticate.handleSupplier, (request, response) => deleteSupplierController.handle(request, response))
    app.put("/supplier", EnsureAuthenticate.handleSupplier, (request, response) => updateSupplierController.handle(request, response))
}

export default supplierRoutes