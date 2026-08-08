import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteMatch(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        publicId: z.string().uuid(),
    })
    const { publicId } = paramsSchema.parse(request.params)

    const match = await prisma.match.findUnique({ where: { publicId } })
    if (!match) {
        return reply.status(404).send({ message: 'Partida não encontrada' })
    }

    await prisma.match.delete({ where: { publicId } })
    return reply.status(200).send({ message: 'Partida deletada com sucesso.' })
}
