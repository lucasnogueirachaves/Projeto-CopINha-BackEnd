import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeDeleteGroupUseCase } from "@/use-cases/factories/groups/make-delete-groups-use-case.js"

export async function deleteGroup(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteGroupParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = deleteGroupParamsSchema.parse(request.params)

        const deleteGroupUseCase = makeDeleteGroupUseCase()

        await deleteGroupUseCase.execute({publicId})

        return reply.status(200).send({message: "Grupo deletado com sucesso."})

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}