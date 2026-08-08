import type { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt.js';
import { listMatches } from './listMatches.js';
import { createMatch } from './createMatch.js';
import { getMatch } from './getMatch.js';
import { updateResult } from './updateResult.js';
import { deleteMatch } from './deleteMatch.js';

export async function matchesRoutes(app: FastifyInstance) {
    app.get('/', listMatches);
    app.get('/:publicId', getMatch);
    app.post('/', { onRequest: verifyJwt }, createMatch);
    app.put('/:publicId', { onRequest: verifyJwt }, updateResult);
    app.delete('/:publicId', { onRequest: verifyJwt }, deleteMatch);
}
