import type { FastifyInstance } from "fastify"
import { verifyJwt } from "@/http/middleware/verify-jwt.js"
import { createGroup } from "./create-group.controller.js"
import { readGroups } from "./read-groups.controller.js"
import { readGroupId } from "./read-group-id.controller.js"
import { updateGroups } from "./update-group.controller.js"
import { deleteGroup } from "./delete-group.controller.js"

export async function teamsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: verifyJwt}, createGroup)
    app.get('/', readGroups)
    app.get('/:publicId', readGroupId)
    app.put('/:publicId', {onRequest: verifyJwt}, updateGroups)
    app.delete('/:publicId', {onRequest: verifyJwt}, deleteGroup)
}