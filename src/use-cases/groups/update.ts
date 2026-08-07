import type { Group } from "@/generated/prisma/client.js"
import type { GroupsRepository } from "@/repositories/groups-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface UpdateGroupUseCaseRequest {
    publicId: string
    name?: string
}

type UpdateGroupUseCaseResponse = {
    group: Group
}

export class UpdateGroupUseCase {
    constructor(private groupsRepository: GroupsRepository) {}
    async execute({publicId, name}: UpdateGroupUseCaseRequest): Promise<UpdateGroupUseCaseResponse> {

        const groupExists = await this.groupsRepository.readId(publicId)

        if (!groupExists) {
            throw new ResourceNotFoundError()
        }

        const group = await this.groupsRepository.update(publicId, {
            ...(name !== undefined ? { name } : {}),
        })

        if (!group) {
            throw new ResourceNotFoundError()
        }

        return { group }
    }
}