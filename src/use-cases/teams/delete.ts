import type { TeamsRepository } from "@/repositories/teams-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface DeleteTeamIdUseCaseRequest {
    publicId: string
}

export class DeleteTeamIdUseCase {
    constructor(private teamsRepository: TeamsRepository) {}
    async execute({publicId}: DeleteTeamIdUseCaseRequest): Promise<void> {
        const team = await this.teamsRepository.readId(publicId)

        if(!team) {
            throw new ResourceNotFoundError()
        }

        await this.teamsRepository.delete(team.publicId)
    }
}