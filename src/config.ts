import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

// const envVariable = z.string().min(1).max(255)

const envSSchema = z.object({
  PORT: z.coerce.number().min(1).default(3000)
})

const { success, error, data } = envSSchema.safeParse(process.env)

if (!success) {
  console.error('❌ Error validating environment variables:', error.format())
  process.exit(1)
}

export const { PORT } = data
