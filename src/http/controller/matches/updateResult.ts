import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateResult(request: FastifyRequest, reply: FastifyReply) {
    const updateResultBodySchema = z.object({
        homeGoals: z.coerce.number(),
        awayGoals: z.coerce.number(),
    })
    const { homeGoals, awayGoals } = updateResultBodySchema.parse(request.body)

    const querySchema = z.object({
        id: z.coerce.number(),
    })

    const matchId = querySchema.parse(request.params).id

    const match = await prisma.match.findUnique({
        where: { id: matchId },
    })
    if (!match) {
        return reply.status(404).send({ error: 'Match not found' })
    }

    const updatedMatch = await prisma.match.update({
        where: { id: matchId },
        data: {
            homeGoals,
            awayGoals,
        },
    })
    return reply.status(200).send({ match: updatedMatch })
}