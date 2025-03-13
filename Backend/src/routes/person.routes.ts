import { createPersonController } from "../useCases/CreatePerson"
import { findAllPersonController } from "../useCases/FindAllPerson"
import { findByIdPersonController } from "../useCases/FindByIdPerson"
import { deletePersonController } from "../useCases/DeletePerson"
import { updatePersonController } from "../useCases/UpdatePerson"
import { Application } from "express-serve-static-core"
import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"

const personRoutes = (app: Application) => {
    app.post("/person", EnsureAuthenticate.handleSupplier, (request, response) => createPersonController.handle(request, response))
    app.get("/person/", (request, response) => findAllPersonController.handle(request, response))
    app.get("/person/:id", EnsureAuthenticate.handleSupplier, (request, response) => findByIdPersonController.handle(request, response))
    app.delete("/person/:id", EnsureAuthenticate.handleSupplier, (request, response) => deletePersonController.handle(request, response))
    app.put("/person/:id", EnsureAuthenticate.handleSupplier, (request, response) => updatePersonController.handle(request, response))
}

export default personRoutes