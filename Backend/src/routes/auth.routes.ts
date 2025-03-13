import EnsureAuthenticate from "../middlewares/EnsureAuthenticate"
import { Application } from "express"
import { authenticateSupplier } from "../useCases/AuthenticateSupplier"

const authRoutes = (app: Application) => {
    app.get("/", EnsureAuthenticate.handleSupplier, (request, response) => {return response.status(200).json({ status: "ok", request: request.body.userId })})
    app.post("/auth",  (req, res) => {authenticateSupplier.handle(req, res) })
}

export default authRoutes