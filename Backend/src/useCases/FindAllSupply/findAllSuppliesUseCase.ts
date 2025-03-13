import { ISupplyRepository } from "../../repositories/ISupplyRepository"


export class FindAllSuppliesUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(id: string) {
        const supplies = await this.supplyRepository.findBySupplierId(id)
        return supplies
    }
}