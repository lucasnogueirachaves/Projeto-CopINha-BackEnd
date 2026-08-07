import type { TeamsRepository } from "@/repositories/teams-repository.js"

export class ReadTeamsUseCase {
    constructor(private teamsRepository: TeamsRepository) {}
    async execute() {
        const teams = await this.teamsRepository.readMany()

        return teams
    }
}