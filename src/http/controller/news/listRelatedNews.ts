import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listRelatedNews(request: FastifyRequest, reply: FastifyReply) {
    const listNewsQuerySchema = z.object({
        groupId: z.coerce.number(),
        currentNewsId: z.coerce.number()
        })
    const { groupId , currentNewsId } = listNewsQuerySchema.parse(request.query)
    const perPage = 3

    const news = await prisma.news.findMany({
        take: perPage,
        orderBy: {
            createdAt: 'desc'
        },
        where:{
            groupId: groupId,
            NOT: {
                id: currentNewsId
            }
        },
        include: {
            author: true,
            group: true,
        }
    })
    return reply.status(200).send(news)
}