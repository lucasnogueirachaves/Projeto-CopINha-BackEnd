import type { Group } from "@/generated/prisma/client.js"
import type { GroupsRepository } from "@/repositories/groups-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface ReadGroupIdUseCaseRequest {
    publicId: string
}

interface ReadGroupIdUseCaseResponse {
    group: Group
}

export class ReadGroupIdUseCase {
    constructor(private groupsRepository: GroupsRepository) {}
    async execute({publicId}: ReadGroupIdUseCaseRequest): Promise<ReadGroupIdUseCaseResponse> {
        const group = await this.groupsRepository.readId(publicId)

        if(!group) {
            throw new ResourceNotFoundError()
        }

        return {group}
    }
}