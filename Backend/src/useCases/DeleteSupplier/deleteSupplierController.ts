import { Response, Request } from "express"
import { DeleteSupplierUseCase } from "./deleteSupplierUseCase"

export class DeleteSupplierController {
    constructor(
        private deleteSupplierUseCase: DeleteSupplierUseCase
    ) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const id = request.body.userId
        await this.deleteSupplierUseCase.execute(id)
        return response.status(200).json("ok")
    }
}