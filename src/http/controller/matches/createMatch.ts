import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createMatch(request: FastifyRequest, reply: FastifyReply) {
    const createGameBodySchema = z.object({
        date: z.date(),
        local: z.string(),
        homeTeamId: z.coerce.number(),
        awayTeamId: z.coerce.number(),
        groupId: z.coerce.number(),
        status: z.enum(['ENCERRADO', 'PROXIMO']),
    })

    const { date, local, homeTeamId, awayTeamId, groupId, status } = createGameBodySchema.parse(request.body)

    const groupAwayTeam = await prisma.team.findUnique({
        where: { id: awayTeamId },
        select: { groupId: true }
    })
    const groupHomeTeam = await prisma.team.findUnique({
        where: { id: homeTeamId },
        select: { groupId: true }
    })

    const IsSameGroup = groupAwayTeam?.groupId === groupHomeTeam?.groupId

    if (!IsSameGroup) {
        return reply.status(400).send({ message: 'Os times devem pertencer ao mesmo grupo' })
    }

    if (homeTeamId === awayTeamId) {
        return reply.status(400).send({ message: 'Os times não podem ser iguais' })
    }

    if (!date || !local || !homeTeamId || !awayTeamId || !groupId || !status) {
        return reply.status(400).send({ message: 'campos ausentes' })
    }

    const match = await prisma.match.create({
        data: {
            date,
            local,
            homeTeamId,
            awayTeamId,
            groupId,
            status
        }
    })
    return reply.status(201).send({ match })
}