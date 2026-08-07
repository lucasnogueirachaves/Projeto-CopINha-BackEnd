import type { TeamsRepository } from "@/repositories/teams-repository.js"
import type { Team } from "@/generated/prisma/client.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface CreateTeamUseCaseRequest {
    name: string
    acronym: string
    flag: string
    groupId: string
}

type CreateTeamUseCaseResponse = {
    team: Team
}

export class CreateTeamUseCase {
    constructor(private teamsRepository: TeamsRepository, private groupsRepository: GroupsRepository) {}
    async execute({
        name,
        acronym,
        flag,
        groupId
    }: CreateTeamUseCaseRequest): Promise<CreateTeamUseCaseResponse> {
        const group = await this.groupsRepository.findById(groupId)

        if (!group) {
            throw new ResourceNotFoundError()
        }
        const team = await this.teamsRepository.create({
            name,
            acronym,
            flag,
            group: {
                connect: {
                    id: group.id
                }
            }
        })
        return {team}
        }
}