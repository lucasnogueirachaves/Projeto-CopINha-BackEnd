import { PrismaTeamsRepository } from "@/repositories/prisma/teams-prisma-repository.js"
import { ReadTeamsUseCase } from "@/use-cases/teams/read-many.js"

export function makeReadTeamsUseCase() {
    const teamsRepository = new PrismaTeamsRepository()
    const readTeamsUseCase = new ReadTeamsUseCase(teamsRepository)

    return readTeamsUseCase
}