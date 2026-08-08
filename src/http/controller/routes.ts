import type { FastifyInstance } from 'fastify';
import { login } from './Login/login.js';
import { newsRoutes } from './news/news.routes.js';
import { teamsRoutes } from './teams/teams.routes.js';
import { groupsRoutes } from './groups/groups.routes.js';
import { matchRoutes } from './matches/match.routes.js';

export async function routes(app: FastifyInstance) {
    app.post('/login', login);
    app.register(newsRoutes);
    app.register(teamsRoutes, {prefix: '/teams'})
    app.register(groupsRoutes, {prefix: '/groups'})
    app.register(matchRoutes)
}