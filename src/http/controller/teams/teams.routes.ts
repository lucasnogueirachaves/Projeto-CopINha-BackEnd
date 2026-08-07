import type { FastifyInstance } from "fastify";
import { createTeam } from "./create-team.controller.js";
import { readTeams } from "./read-teams.controller.js";
import { readTeamId } from "./read-team-id.controller.js";
import { updateTeams } from "./update-team.controller.js";
import { deleteTeam } from "./delete-team.controller.js";
import { verifyJwt } from "../../middleware/verify-jwt.js";

export async function teamsRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: verifyJwt}, createTeam)
    app.get('/', readTeams)
    app.get('/:publicId', readTeamId)
    app.put('/:publicId', {onRequest: verifyJwt}, updateTeams)
    app.delete('/:publicId', {onRequest: verifyJwt}, deleteTeam)
}