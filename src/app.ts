import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env/index.js"
import { routes } from "./http/controller/routes.js"

export const app = fastify()

app.register(routes)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})