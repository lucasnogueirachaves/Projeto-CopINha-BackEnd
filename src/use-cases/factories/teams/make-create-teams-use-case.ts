import { PrismaTeamsRepository } from "@/repositories/prisma/teams-prisma-repository.js"
import {PrismaGroupsRepository} from "@/repositories/prisma/groups-prisma-repository.js"
import { CreateTeamUseCase } from "@/use-cases/teams/create.js"

export function makeCreateTeamUseCase() {
    const teamsRepository = new PrismaTeamsRepository()
    const groupsRepository = new PrismaGroupsRepository()

    const createTeamUseCase = new CreateTeamUseCase(teamsRepository,groupsRepository)

    return createTeamUseCase
}