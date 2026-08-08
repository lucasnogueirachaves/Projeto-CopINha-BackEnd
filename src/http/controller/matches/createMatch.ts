import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createMatch(request: FastifyRequest, reply: FastifyReply) {
    const createGameBodySchema = z.object({
        date: z.coerce.date(),
        local: z.string(),
        homeTeamId: z.string().uuid(),
        awayTeamId: z.string().uuid(),
        groupId: z.string().uuid(),
    })

    const { date, local, homeTeamId, awayTeamId, groupId } = createGameBodySchema.parse(request.body)

    if (homeTeamId === awayTeamId) {
        return reply.status(400).send({ message: 'Os times não podem ser iguais' })
    }

    const [homeTeam, awayTeam, group] = await Promise.all([
        prisma.team.findUnique({ where: { publicId: homeTeamId } }),
        prisma.team.findUnique({ where: { publicId: awayTeamId } }),
        prisma.group.findUnique({ where: { publicId: groupId } }),
    ])

    if (!homeTeam || !awayTeam || !group) {
        return reply.status(404).send({ message: 'Time ou grupo não encontrado' })
    }

    if (homeTeam.groupId !== group.id || awayTeam.groupId !== group.id) {
        return reply.status(400).send({ message: 'Os times devem pertencer ao mesmo grupo referente a partida' })
    }

    const match = await prisma.match.create({
        data: {
            date,
            local,
            homeTeamId: homeTeam.id,
            awayTeamId: awayTeam.id,
            groupId: group.id,
            status: 'PROXIMO',
        },
        include: { homeTeam: true, awayTeam: true, group: true },
    })
    return reply.status(201).send({ match })
}
