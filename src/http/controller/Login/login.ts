import { z } from 'zod'
import { prisma } from '@/libs/prisma.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { compare } from 'bcryptjs'

export async function login(request: FastifyRequest, reply: FastifyReply) {
    const loginBodySchema = z.object({
        email: z.email(),
        password: z.string()
    })

    const { email, password } = loginBodySchema.parse(request.body)

    const user = await prisma.admin.findUnique({
        where: {
            email
        }
    })  

    if (!user) {
        return reply.status(401).send({
            message: 'credenciais inválidas'
        })
    }

    const isPasswordCorrect = await compare(password, user.password)

    if (!isPasswordCorrect) {
        return reply.status(401).send({
            message: 'credenciais inválidas'
        })
    }

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: String(user.id),
                expiresIn: '1d'
            }
        })

    return reply.status(200).send({
        token,
        user: {
            id: String(user.id),
            email: user.email
        }
    })
}
