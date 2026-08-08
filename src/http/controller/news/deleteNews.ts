import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteNews(request: FastifyRequest, reply: FastifyReply) {
    const {id: newsId} = request.params as {id: number}

    const news = await prisma.news.delete({
        where: {
            id: Number(newsId)
        }
    })
    return reply.status(204).send(news)
}