import { Response, Request } from "express"
import { DeleteSupplyUseCase } from "./deleteSupplyUseCase"

export class DeleteSupplyController {
    constructor(
        private deleteSupplyUseCase: DeleteSupplyUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        await this.deleteSupplyUseCase.execute(id)
        return response.status(200).json("ok")
    }
}