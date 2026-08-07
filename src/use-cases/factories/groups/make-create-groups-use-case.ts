import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { CreateGroupUseCase } from "@/use-cases/groups/create.js"

export function makeCreateGroupUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const createGroupUseCase = new CreateGroupUseCase(groupsRepository)

    return createGroupUseCase
}