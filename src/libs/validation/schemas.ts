import { z } from 'zod'

export const authCodeSchema = z.string().min(1).max(255)
