import type { GroupsRepository } from "@/repositories/groups-repository.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

interface SimulationMatch {
    publicId: string
    homeGoals: number
    awayGoals: number
}

interface SimulatorUseCaseRequest {
    publicId: string
    matches: SimulationMatch[]
}

export interface TeamClassification {
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

export class SimulatorUseCase {
    constructor(private groupsRepository: GroupsRepository) {}

    async execute({
        publicId,
        matches: simulatedMatches
    }: SimulatorUseCaseRequest): Promise<TeamClassification[]> {

        const group = await this.groupsRepository.classification(publicId)

        if (!group) {
            throw new ResourceNotFoundError()
        }

        const classification: TeamClassification[] = group.teams.map((team) => ({
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

        for (const match of group.matches) {

            if (match.status === "ENCERRADO") {
                this.calculateMatch(
                    classification,
                    match.homeTeamId,
                    match.awayTeamId,
                    match.homeGoals ?? 0,
                    match.awayGoals ?? 0
                )

                continue
            }

            const simulation = simulatedMatches.find(
                (simulatedMatch) =>
                    simulatedMatch.publicId === match.publicId
            )

            if (!simulation) {
                continue
            }

            this.calculateMatch(
                classification,
                match.homeTeamId,
                match.awayTeamId,
                simulation.homeGoals,
                simulation.awayGoals
            )
        }

        classification.forEach((team) => {
            team.goalDifference =
                team.goalsFor - team.goalsAgainst
        })

        classification.sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points
            }

            return b.goalDifference - a.goalDifference
        })

        return classification
    }

    private calculateMatch(
        classification: TeamClassification[],
        homeTeamId: number,
        awayTeamId: number,
        homeGoals: number,
        awayGoals: number
    ) {
        const homeTeam = classification.find(
            (team) => team.teamId === homeTeamId
        )

        const awayTeam = classification.find(
            (team) => team.teamId === awayTeamId
        )

        if (!homeTeam || !awayTeam) {
            return
        }

        homeTeam.goalsFor += homeGoals
        homeTeam.goalsAgainst += awayGoals

        awayTeam.goalsFor += awayGoals
        awayTeam.goalsAgainst += homeGoals

        if (homeGoals > awayGoals) {

            homeTeam.points += 3
            homeTeam.wins += 1

            awayTeam.losses += 1

        } else if (homeGoals < awayGoals) {

            awayTeam.points += 3
            awayTeam.wins += 1

            homeTeam.losses += 1

        } else {

            homeTeam.points += 1
            awayTeam.points += 1

            homeTeam.draws += 1
            awayTeam.draws += 1
        }
    }
}