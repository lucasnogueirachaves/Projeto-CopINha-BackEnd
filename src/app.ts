import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env/index.js"
import { routes } from "./http/controller/routes.js"
import cors from "@fastify/cors"

export const app = fastify()

app.register(routes)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
})