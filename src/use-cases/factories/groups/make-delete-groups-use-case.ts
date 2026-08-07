import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { DeleteGroupIdUseCase } from "@/use-cases/groups/delete.js"

export function makeDeleteGroupUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const deleteGroupUseCase = new DeleteGroupIdUseCase(groupsRepository)

    return deleteGroupUseCase
}