import { z } from 'zod'
import dotenv from 'dotenv'
dotenv.config()

const envVariable = z.string().min(1).max(255)

const envSSchema = z.object({
  PORT: z.coerce.number().min(1).default(3000),
  SESSION_SECRET: envVariable,
  GOOGLE_CLIENT_ID: envVariable,
  GOOGLE_CLIENT_SECRET: envVariable,
  GOOGLE_REDIRECT_URI: envVariable
})

const { success, error, data } = envSSchema.safeParse(process.env)

if (!success) {
  console.error('❌ Error validating environment variables:', error.format())
  process.exit(1)
}

export const {
  PORT,
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} = data
