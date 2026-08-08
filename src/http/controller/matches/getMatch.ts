import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMatch(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = querySchema.parse(request.params)
    const match = await prisma.match.findUnique({
        where: { id },
    })
    if (!match) {
        return reply.status(404).send({ error: 'Partida não encontrada' })
    }
    return reply.status(200).send({ match })
}