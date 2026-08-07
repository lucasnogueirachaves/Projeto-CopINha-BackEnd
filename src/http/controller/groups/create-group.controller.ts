import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeCreateGroupUseCase } from "@/use-cases/factories/groups/make-create-groups-use-case.js"

export async function createGroup(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createGroupBodySchema = z.object({
            name: z.string().trim().min(1),
        })

        const { name } = createGroupBodySchema.parse(request.body)

        const createGroupUseCase = makeCreateGroupUseCase()

        const { group } = await createGroupUseCase.execute({
            name
        })

        return reply.status(201).send(group)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}