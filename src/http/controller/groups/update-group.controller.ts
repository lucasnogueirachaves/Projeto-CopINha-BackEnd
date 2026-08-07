import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { makeUpdateGroupsUseCase } from "@/use-cases/factories/groups/make-update-groups-use-case.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"

export async function updateGroups(request: FastifyRequest, reply: FastifyReply) {
    try {
        const updateParamsSchema = z.object({
            publicId: z.string().uuid()
        })
        
        const { publicId } = updateParamsSchema.parse(request.params)

        const updateBodySchema = z.object({
            name: z.string().trim().min(1).max(100)
        })

        const {name} = updateBodySchema.parse(request.body)

        const updateGroupsUseCase = makeUpdateGroupsUseCase()

        const { group } = await updateGroupsUseCase.execute({
            publicId,
            name,
        })

        return reply.status(200).send(group)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
                return reply.status(404).send({message: error.message})
        }
        throw error
    }
}