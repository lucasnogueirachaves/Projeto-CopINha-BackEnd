import { PrismaGroupsRepository } from "@/repositories/prisma/groups-prisma-repository.js"
import { SimulatorUseCase } from "@/use-cases/groups/simulator.js"

export function makeSimulatorUseCase() {

    const groupsRepository = new PrismaGroupsRepository()
    return new SimulatorUseCase(groupsRepository)
}