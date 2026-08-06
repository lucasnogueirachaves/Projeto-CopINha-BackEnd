import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listRelatedNews(request: FastifyRequest, reply: FastifyReply) {
    const listNewsQuerySchema = z.object({
        id: z.coerce.number()
        })
    const { id:currentNewsId } = listNewsQuerySchema.parse(request.params)
    const perPage = 3

        const groupId = await prisma.news.findUnique({
            where: {
                id: currentNewsId
            },
            select: {
                groupId: true
            }
        })
    
    if (!groupId) {
        return reply.status(404).send({
            message: 'Notícia não encontrada'
        })
    }

    const news = await prisma.news.findMany({
        take: perPage,
        orderBy: {
            createdAt: 'desc'
        },
        where:{
            groupId: groupId.groupId,
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