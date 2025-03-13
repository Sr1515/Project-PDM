import { Supply } from "../../types/Supply"
import { ISupplyRepository } from "../../repositories/ISupplyRepository"
//import { ISupplyRequestDTO } from "./createSupplyDTO"

export class CreateSupplyUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(data: any) {
        const supply = new Supply(data)
        return await this.supplyRepository.save(supply)
    }
}