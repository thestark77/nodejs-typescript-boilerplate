import express from 'express'
import { authRouter } from './routes/auth.js'
import { tasksRouter } from './routes/tasks.js'
import cors from 'cors'
import dbClient from './db/client.js'
import { handleError } from './utils/errorHandler.js'
import { PORT } from './utils/config.js'

const app = express()
const appPort = PORT ?? 3000
app.use(express.json())
app.use(cors())
dbClient.sync()

app.use('/auth', authRouter)
app.use('/tasks', tasksRouter)

// Not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling
app.use(async (err, req, res, next) => {
  const { status, ...formState } = handleError({ error: err })
  res.status(status).json(formState)
})

app.listen(appPort, () => {
  console.log(`Server running on port ${appPort}`)
})
