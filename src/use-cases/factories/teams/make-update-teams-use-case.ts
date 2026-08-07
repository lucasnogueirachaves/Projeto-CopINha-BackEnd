import { PrismaTeamsRepository } from "@/repositories/prisma/teams-prisma-repository.js"
import {PrismaGroupsRepository} from "@/repositories/prisma/groups-prisma-repository.js"
import { UpdateTeamsUseCase } from "@/use-cases/teams/update.js"

export function makeUpdateTeamsUseCase() {
    const teamsRepository = new PrismaTeamsRepository()
    const groupsRepository = new PrismaGroupsRepository()

    const updateTeamsUseCase = new UpdateTeamsUseCase(teamsRepository,groupsRepository)

    return updateTeamsUseCase
}