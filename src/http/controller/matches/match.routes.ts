import fastify from "fastify";
import { createMatch } from "./createMatch.js";
import { getMatch } from "./getMatch.js";
import { updateResult } from "./updateResult.js";
import { listMatches } from "./listMatches.js";

export async function matchRoutes(app: fastify.FastifyInstance) {
    app.post('/matches', createMatch);
    app.get('/matches/:id', getMatch);
    app.patch('/matches/:id/result', updateResult);
    app.get('/matches', listMatches);
}