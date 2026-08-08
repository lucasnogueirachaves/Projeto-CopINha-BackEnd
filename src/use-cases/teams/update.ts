import type { TeamsRepository } from "@/repositories/teams-repository.js";
import type { GroupsRepository } from "@/repositories/groups-repository.js";
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js";
import type { GroupsRepository } from "@/repositories/groups-repository.js";
import type { Team } from "@/generated/prisma/client.js";

interface UpdateTeamUseCaseRequest {
    publicId: string
    name?: string
    acronym?: string
    flag?: string
    groupId?: string
}

type UpdateTeamUseCaseResponse = {
    team: Team
}

export class UpdateTeamsUseCase {
    constructor(private teamsRepository: TeamsRepository, private groupsRepository: GroupsRepository) {}

    async execute({ publicId, name, acronym, flag, groupId }: UpdateTeamUseCaseRequest): Promise<UpdateTeamUseCaseResponse> {
        const teamToUpdate = await this.teamsRepository.readId(publicId)

        if (!teamToUpdate) {
            throw new ResourceNotFoundError()
        }

        if (groupId !== undefined) {
            const group = await this.groupsRepository.readId(groupId)

            if (!group) {
                throw new ResourceNotFoundError()
            }
        }

        const updateData: any = {}
        if (name !== undefined) updateData.name = name
        if (acronym !== undefined) updateData.acronym = acronym
        if (flag !== undefined) updateData.flag = flag
        if (groupId !== undefined) {
            const group = await this.groupsRepository.readId(groupId)

            if (!group) {
                throw new ResourceNotFoundError()
            }

            updateData.group = {
                connect: {
                    id: group.id
                }
            }
        }
        const team = await this.teamsRepository.update(teamToUpdate.publicId, updateData)

        if (!team) {
            throw new ResourceNotFoundError()
        }

        return { team }
    }
}