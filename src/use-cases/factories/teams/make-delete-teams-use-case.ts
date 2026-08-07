import { PrismaTeamsRepository } from "@/repositories/prisma/teams-prisma-repository.js"
import { DeleteTeamIdUseCase } from "@/use-cases/teams/delete.js"

export function makeDeleteTeamUseCase() {
    const teamsRepository = new PrismaTeamsRepository()
    const deleteTeamUseCase = new DeleteTeamIdUseCase(teamsRepository)

    return deleteTeamUseCase
}