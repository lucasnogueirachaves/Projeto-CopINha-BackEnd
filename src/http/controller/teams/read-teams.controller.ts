import type { FastifyRequest, FastifyReply } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeReadTeamsUseCase } from "@/use-cases/factories/teams/make-read-teams-use-case.js"

export async function readTeams(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const readTeamsUseCase = makeReadTeamsUseCase()

        const teams = await readTeamsUseCase.execute()

        return reply.status(200).send(teams)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}