import { Request, Response } from "express"
import { SaveImageUseCase } from "./saveProductUseCase"

export class SaveImageController {

    constructor(
        private saveImageUseCase: SaveImageUseCase
    ) { }

    async handle(req: Request, res: Response) {
        try {
            //@ts-ignore
            const image = req.file?.filename || ""
            await this.saveImageUseCase.execute(req.params.id, image)
            res.json("ok")
        } catch (error) {
            console.log(error)
        }
    }

}

