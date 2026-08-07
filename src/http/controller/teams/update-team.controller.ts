import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeUpdateTeamsUseCase } from "@/use-cases/factories/teams/make-update-teams-use-case.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function updateTeams(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string().uuid()
        })
        
        const { publicId } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            name: z.string().trim().min(1).max(100),
            acronym: z.string().trim().min(2).max(5),
            flag: z.string(),
            groupId: z.string().uuid()
        })

        const {name, acronym, flag, groupId} = updateBodySchema.parse(request.body)

        const updateTeamsUseCase = makeUpdateTeamsUseCase()

        const { team } = await updateTeamsUseCase.execute({
            publicId,
            name,
            acronym,
            flag,
            groupId
        })

        return reply.status(200).send(team)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({message: error.message})
        }
        throw error
    }
}