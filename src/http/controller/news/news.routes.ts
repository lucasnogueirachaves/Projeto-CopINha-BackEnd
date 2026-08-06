import { createNews } from './createNews.js'
import { getNews } from './getNews.js'
import { listRelatedNews } from './listRelatedNews.js'
import { listNews } from './listNews.js'
import { verifyJwt } from '../middleware/verify-jwt.js'

export function newsRoutes(app: any) {
    app.get('/news', listNews)
    app.get('/news/:id/related', listRelatedNews)
    app.get('/news/:id', getNews)
    app.post('/news',{onRequest: verifyJwt}, createNews)
}