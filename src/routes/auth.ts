import { Router } from 'express'
import { login, logout, getLoginUrl } from '@/controllers/auth'
const authRouter = Router()

authRouter.get('/google', getLoginUrl)

authRouter.get('/google/callback', login)

authRouter.get('/google/logout', logout)

export { authRouter }
