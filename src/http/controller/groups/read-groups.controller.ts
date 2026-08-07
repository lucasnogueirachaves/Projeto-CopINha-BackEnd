import type { FastifyRequest, FastifyReply } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeReadGroupsUseCase } from "@/use-cases/factories/groups/make-read-groups-use-case.js"

export async function readGroups(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const readGroupsUseCase = makeReadGroupsUseCase()

        const groups = await readGroupsUseCase.execute()

        return reply.status(200).send(groups)

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}