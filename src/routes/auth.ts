import { Router } from 'express'
import { login, logout } from '@/controllers/auth'
import { getLoginUrl } from '@/auth.config'
const authRouter = Router()

authRouter.get('/google', (req, res) => {
  res.redirect(getLoginUrl())
})

authRouter.get('/google/callback', login)

authRouter.get('/google/logout', logout)

export { authRouter }
