import { z } from 'zod'
import dotenv from 'dotenv'
import { stringSchema } from '@/libs/validation/schemas'
dotenv.config()

const envSSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number().min(1).default(3000),
  SESSION_SECRET: stringSchema,
  GOOGLE_CLIENT_ID: stringSchema,
  GOOGLE_CLIENT_SECRET: stringSchema,
  GOOGLE_REDIRECT_URI: stringSchema
})

const { success, error, data } = envSSchema.safeParse(process.env)

if (!success) {
  console.error('❌ Error validating environment variables:', error.format())
  process.exit(1)
}

export const {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} = data
