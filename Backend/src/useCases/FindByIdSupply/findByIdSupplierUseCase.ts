import { ISupplyRepository } from "../../repositories/ISupplyRepository"


export class FindByIdSupplyUseCase {

    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(id: string) {
        const person = await this.supplyRepository.findById(id)
        return person
    }
}