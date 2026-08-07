import type { GroupsRepository } from "@/repositories/groups-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface DeleteGroupIdUseCaseRequest {
    publicId: string
}

export class DeleteGroupIdUseCase {
    constructor(private groupsRepository: GroupsRepository) {}
    async execute({publicId}: DeleteGroupIdUseCaseRequest): Promise<void> {
        const group = await this.groupsRepository.readId(publicId)

        if(!group) {
            throw new ResourceNotFoundError()
        }

        await this.groupsRepository.delete(group.publicId)
    }
}