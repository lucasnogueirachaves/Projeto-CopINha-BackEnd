import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { ReadGroupsUseCase } from "@/use-cases/groups/read-many.js"

export function makeReadGroupsUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const readGroupsUseCase = new ReadGroupsUseCase(groupsRepository)

    return readGroupsUseCase
}