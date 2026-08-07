
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getNews(request: FastifyRequest, reply: FastifyReply) {
    const {id: newsId} = request.params as {id: number}
    const news = await prisma.news.findUnique({
        where: {
            id: newsId
        },
        include: {
            author: true, 
            group: true
        }
    })
    return reply.status(200).send(news)}