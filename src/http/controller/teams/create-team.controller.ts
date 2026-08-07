import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeCreateTeamUseCase } from "@/use-cases/factories/teams/make-create-teams-use-case.js"

export async function createTeam(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createTeamBodySchema = z.object({
            name: z.string().trim().min(1),
            acronym: z.string().trim().min(2).max(5),
            flag: z.string(),
            groupId: z.string().uuid()
        })

        const { name, acronym, flag, groupId } = createTeamBodySchema.parse(request.body)

        const createTeamUseCase = makeCreateTeamUseCase()

        const { team } = await createTeamUseCase.execute({
            name,
            acronym,
            flag,
            groupId
        })

        return reply.status(201).send(team)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}
