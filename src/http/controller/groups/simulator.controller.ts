import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeSimulatorUseCase } from "@/use-cases/factories/groups/make-simulator-use-case.js"

export async function simulator(
    request: FastifyRequest,
    reply: FastifyReply
) {

    try {

        const paramsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            matches: z.array(
                z.object({
                    publicId: z.string().uuid(),
                    homeGoals: z.number().int().min(0),
                    awayGoals: z.number().int().min(0)
                })
            )
        })

        const { matches } = bodySchema.parse(request.body)

        const simulatorUseCase = makeSimulatorUseCase()

        const classification = await simulatorUseCase.execute({
            publicId,
            matches
        })

        return reply.status(200).send({
            classification
        })

    } catch (error) {

        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }

        throw error
    }
}