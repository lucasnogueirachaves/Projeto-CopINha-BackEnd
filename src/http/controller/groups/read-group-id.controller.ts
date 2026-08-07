import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeReadGroupIdUseCase } from "@/use-cases/factories/groups/make-read-id-groups-use-case.js"

export async function readGroupId(request: FastifyRequest, reply: FastifyReply) {
    try {
        const readGroupIdParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = readGroupIdParamsSchema.parse(request.params)

        const readGroupIdUseCase = makeReadGroupIdUseCase()

        const group = await readGroupIdUseCase.execute({publicId})

        return reply.status(200).send(group)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}
