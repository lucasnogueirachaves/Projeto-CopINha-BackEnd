import type { FastifyInstance } from 'fastify';
import { login } from './Login/login.js';
import { newsRoutes } from './news/news.routes.js';
export async function routes(app: FastifyInstance) {
    app.post('/login', login);
    app.register(newsRoutes, { prefix: '/news' });
}