import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { PORT, SESSION_SECRET } from '@/config'
import { authRouter } from '@/routes/auth'
import logger from 'morgan'

const app = express()
const appPort = PORT
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
)

// Routes
app.use('/auth', authRouter)
// app.use('/tasks', tasksRouter)

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start server
app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`)
})
