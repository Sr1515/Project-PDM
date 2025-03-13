import { ISupplyRepository } from "../../repositories/ISupplyRepository"

export class DeleteSupplyUseCase {
    constructor(
        private supplyRepository: ISupplyRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.supplyRepository.remove(id)
    }
}