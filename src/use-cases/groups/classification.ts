import type { GroupsRepository } from "@/repositories/groups-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface ClassificationUseCaseRequest {
    publicId: string
}

interface TeamClassification {
    teamId: number
    name: string
    points: number
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    goalDifference: number
}

export class ClassificationUseCase {
    constructor(private groupsRepository: GroupsRepository) {}

    async execute({publicId}: ClassificationUseCaseRequest): Promise<TeamClassification[]> {
        const group = await this.groupsRepository.classification(publicId)

        if (!group) {
            throw new ResourceNotFoundError()
        }

        const teams = group?.teams
        const matches = group?.matches

        const classification: TeamClassification[] = (teams ?? []).map((team) => ({
            teamId: team.id,
            name: team.name,
            points: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0
        }))

        matches?.forEach((match) => {
            if (match.status !== 'ENCERRADO') {
                return
            }

            const homeTeam = classification.find((team) => team.teamId === match.homeTeamId)
            const awayTeam = classification.find((team) => team.teamId === match.awayTeamId)

            if (!homeTeam || !awayTeam) {
                return
            }

            homeTeam.goalsFor += match.homeGoals ?? 0
            homeTeam.goalsAgainst += match.awayGoals ?? 0

            awayTeam.goalsFor += match.awayGoals ?? 0
            awayTeam.goalsAgainst += match.homeGoals ?? 0

            if ((match.homeGoals ?? 0) > (match.awayGoals ?? 0)) {
                homeTeam.points += 3
                homeTeam.wins += 1
                awayTeam.losses += 1
            } else if ((match.homeGoals ?? 0) < (match.awayGoals ?? 0)) {
                awayTeam.points += 3
                awayTeam.wins += 1
                homeTeam.losses += 1
            } else {
                homeTeam.points += 1
                awayTeam.points += 1
                homeTeam.draws += 1
                awayTeam.draws += 1
            }
        })

        classification.forEach((team) => {
            team.goalDifference = team.goalsFor - team.goalsAgainst
        })

        classification.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points
            }

            return b.goalDifference - a.goalDifference
        })

        return classification
    }
}
