import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { handleError } from '@/libs/errorHandler'
import { PORT } from '@/config'

const app = express()
const appPort = PORT
app.use(express.json())
app.use(cors())

// Routes
// app.use('/auth', authRouter)
// app.use('/tasks', tasksRouter)

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling
app.use(
  async (error: unknown, req: Request, res: Response, next: NextFunction) => {
    const { status, ...formState } = await handleError({ error })
    res.status(status).json(formState)
  }
)

// Start server
app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`)
})
