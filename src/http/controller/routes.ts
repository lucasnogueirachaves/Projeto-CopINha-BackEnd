import type { FastifyInstance } from 'fastify';
import { login } from './Login/login.js';

export async function routes(app: FastifyInstance) {
    app.post('/login', login);
}