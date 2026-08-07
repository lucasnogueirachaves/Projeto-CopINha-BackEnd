import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { UpdateGroupUseCase } from "@/use-cases/groups/update.js"

export function makeUpdateGroupsUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const updateGroupsUseCase = new UpdateGroupUseCase(groupsRepository)

    return updateGroupsUseCase
}