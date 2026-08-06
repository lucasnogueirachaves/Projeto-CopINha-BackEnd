import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createNews(request: FastifyRequest, reply: FastifyReply) {
    const createNewsBodySchema = z.object({
        title: z.string(),
        summary: z.string(),
        text: z.string(),
        image: z.string(),
        readingTime: z.number(),
        groupId: z.number()
    })
    const { sub: authorId } = request.user as { sub: number }

    const { title, summary, text, image, readingTime, groupId } = createNewsBodySchema.parse(request.body)
    

    if (!title || !summary || !text || !image || !readingTime) {
        return reply.status(400).send({
            message: 'Todos os campos são obrigatórios'
        })
    }

    const news = await prisma.news.create({
        data: {
            title,
            summary,
            text,
            image,
            readingTime,
            authorId,
            groupId
        }
    })
    return reply.status(201).send(news)
}