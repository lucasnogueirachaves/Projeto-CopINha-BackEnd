import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeClassificationUseCase } from "@/use-cases/factories/groups/make-classification-use-case.js"

export async function classification(request: FastifyRequest, reply: FastifyReply) {
    try {
        const classificationParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = classificationParamsSchema.parse(request.params)

        const classificationUseCase = makeClassificationUseCase()

        const classification = await classificationUseCase.execute({publicId})

        return reply.status(200).send(classification)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}