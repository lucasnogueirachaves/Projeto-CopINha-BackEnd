import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error.js"
import { makeDeleteTeamUseCase } from "@/use-cases/factories/teams/make-delete-teams-use-case.js"

export async function deleteTeam(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteTeamParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = deleteTeamParamsSchema.parse(request.params)

        const deleteTeamUseCase = makeDeleteTeamUseCase()

        await deleteTeamUseCase.execute({publicId})

        return reply.status(200).send({message: "Time deletado com sucesso."})

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw error
    }
}
