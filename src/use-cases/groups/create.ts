import type { GroupsRepository } from "@/repositories/groups-repository.js"
import type { Group } from "@/generated/prisma/client.js"

interface CreateGroupUseCaseRequest {
    name: string
}

type CreateGroupUseCaseResponse = {
    group: Group
}

export class CreateGroupUseCase {
    constructor(private groupsRepository: GroupsRepository) {}

    async execute({name}: CreateGroupUseCaseRequest): Promise<CreateGroupUseCaseResponse> {

        const group = await this.groupsRepository.create({name})

        return { group }
    }
}