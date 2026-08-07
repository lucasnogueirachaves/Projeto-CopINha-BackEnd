import type { Team } from "@/generated/prisma/client.js"
import type { TeamsRepository } from "@/repositories/teams-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface ReadTeamIdUseCaseRequest {
    publicId: string
}

interface ReadTeamIdUseCaseResponse {
    team: Team
}

export class ReadTeamIdUseCase {
    constructor(private teamsRepository: TeamsRepository) {}
    async execute({publicId}: ReadTeamIdUseCaseRequest): Promise<ReadTeamIdUseCaseResponse> {
        const team = await this.teamsRepository.readId(publicId)

        if(!team) {
            throw new ResourceNotFoundError()
        }

        return {team}
    }
}