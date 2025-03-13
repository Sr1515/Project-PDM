import { createProductController } from "../useCases/CreateProduct"
import { findAllProductsController } from "../useCases/FindAllProduct"
import { findByIdProductController } from "../useCases/FindByIdProduct"
import { deleteProductController } from "../useCases/DeleteProduct"
import { updateProductController } from "../useCases/UpdateProduct"
import { Application, response } from "express"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { findSupplierProductsController } from "../useCases/FindSupplierProduct"
import { findAllSearchProductsController } from "../useCases/FindAllSearchProduct"
import { request } from "http"
import { saveProductImageController } from "../useCases/SaveProductImage"
import { upload } from "../utils/multer"
import { findByIdProductImageController } from "../useCases/FindByIdProductImage"


const productRoutes = (app: Application) => {
    app.post("/product", EnsureAuthenticate.handleSupplier, (request, response) => createProductController.handle(request, response))

    app.get("/product", (request, response) => findAllProductsController.handle(request, response))

    app.get("/product-search", EnsureAuthenticate.handleSupplier, (request, response) => findAllSearchProductsController.handle(request, response))

    app.get("/own-products", EnsureAuthenticate.handleSupplier, (request, response) => findSupplierProductsController.handle(request, response))

    app.get("/product/:id", (request, response) => findByIdProductController.handle(request, response))

    app.delete("/product/:id", EnsureAuthenticate.handleSupplier, (request, response) => deleteProductController.handle(request, response))

    app.put("/product/:id", EnsureAuthenticate.handleSupplier, (request, response) => updateProductController.handle(request, response))

    app.get("/product-image/:id", (request, response) => findByIdProductImageController.handle(request, response))

    app.patch("/product/:id", EnsureAuthenticate.handleSupplier, upload.single("file"), (request, response) => saveProductImageController.handle(request, response))


}

export default productRoutes
