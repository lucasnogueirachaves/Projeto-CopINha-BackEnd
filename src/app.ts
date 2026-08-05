import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"   
import { env } from "./env/index.js"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})