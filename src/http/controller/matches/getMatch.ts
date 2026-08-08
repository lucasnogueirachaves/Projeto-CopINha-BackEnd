import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMatch(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        publicId: z.string().uuid(),
    })
    const { publicId } = paramsSchema.parse(request.params)
    const match = await prisma.match.findUnique({
        where: { publicId },
        include: { homeTeam: true, awayTeam: true, group: true },
    })
    if (!match) {
        return reply.status(404).send({ error: 'Partida não encontrada' })
    }
    return reply.status(200).send({ match })
}
