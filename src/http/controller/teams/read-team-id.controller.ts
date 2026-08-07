import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeReadTeamIdUseCase } from "@/use-cases/factories/teams/make-read-teams-id-use-case.js"

export async function readTeamId(request: FastifyRequest, reply: FastifyReply) {
    try {
        const readTeamIdParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = readTeamIdParamsSchema.parse(request.params)

        const readTeamIdUseCase = makeReadTeamIdUseCase()

        const team = await readTeamIdUseCase.execute({publicId})

        return reply.status(200).send(team)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}
