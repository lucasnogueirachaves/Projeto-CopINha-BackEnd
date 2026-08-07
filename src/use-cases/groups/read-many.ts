import type { GroupsRepository } from "@/repositories/groups-repository.js"

export class ReadGroupsUseCase {
    constructor(private groupsRepository: GroupsRepository) {}
    async execute() {
        const groups = await this.groupsRepository.readMany()

        return groups
    }
}