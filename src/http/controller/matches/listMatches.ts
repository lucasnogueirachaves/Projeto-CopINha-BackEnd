import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listMatches(request: FastifyRequest, reply: FastifyReply) {
    const querySchema = z.object({
        status: z.enum(['ENCERRADO', 'PROXIMO']).optional(),
        groupId: z.coerce.number().optional(),
    })
    const conditions = []
    const { status, groupId } = querySchema.parse(request.query)
    if (status) {
        conditions.push({ status })
    }
    if (groupId) {
        conditions.push({ groupId })
    }
    
    const matches = await prisma.match.findMany({
        include: {
            homeTeam: true,
            awayTeam: true,
            group: true,
        },
        where: conditions.length > 0 ? { OR: conditions } : {},
    })
    return reply.status(200).send({ matches })
}