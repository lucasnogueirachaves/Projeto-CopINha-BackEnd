import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listNews(request: FastifyRequest, reply: FastifyReply) {
    const listNewsQuerySchema = z.object({
        page: z.number().optional().default(1),
        })
    const { page } = listNewsQuerySchema.parse(request.query)
    const perPage = 5
    const skip = (page - 1) * perPage
    
    const news = await prisma.news.findMany({
        take: perPage,
        skip: skip,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: true,
            group: true,
        }
    })
    return reply.status(200).send(news)
}