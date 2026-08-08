import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateResult(request: FastifyRequest, reply: FastifyReply) {
    const updateResultBodySchema = z.object({
        homeGoals: z.coerce.number(),
        awayGoals: z.coerce.number(),
    })
    const { homeGoals, awayGoals } = updateResultBodySchema.parse(request.body)

    const paramsSchema = z.object({
        publicId: z.string().uuid(),
    })
    const { publicId } = paramsSchema.parse(request.params)

    const match = await prisma.match.findUnique({ where: { publicId } })
    if (!match) {
        return reply.status(404).send({ error: 'Match not found' })
    }

    const updatedMatch = await prisma.match.update({
        where: { publicId },
        data: { homeGoals, awayGoals, status: 'ENCERRADO' },
        include: { homeTeam: true, awayTeam: true, group: true },
    })
    return reply.status(200).send({ match: updatedMatch })
}