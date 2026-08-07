import { PrismaTeamsRepository } from "@/repositories/prisma/teams-prisma-repository.js"
import { ReadTeamIdUseCase } from "@/use-cases/teams/read-id.js"

export function makeReadTeamIdUseCase() {
    const teamsRepository = new PrismaTeamsRepository()
    const readTeamIdUseCase = new ReadTeamIdUseCase(teamsRepository)

    return readTeamIdUseCase
}