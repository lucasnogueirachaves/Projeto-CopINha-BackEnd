import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { ClassificationUseCase } from "@/use-cases/groups/classification.js"

export function makeClassificationUseCase() {
    const groupsRepository = new PrismaGroupsRepository()
    const classificationUseCase = new ClassificationUseCase(groupsRepository)

    return classificationUseCase
}