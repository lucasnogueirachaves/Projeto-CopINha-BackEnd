import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { ReadGroupIdUseCase } from "@/use-cases/groups/read-id.js"

export function makeReadGroupIdUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const readGroupIdUseCase = new ReadGroupIdUseCase(groupsRepository)

    return readGroupIdUseCase
}