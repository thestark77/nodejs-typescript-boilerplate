import { OAuth2Client } from 'google-auth-library'
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} from '@/config'
import { AuthError } from './libs/errorHandler'

const client = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URI
})

export function getLoginUrl(): string {
  return client.generateAuthUrl({
    access_type: 'offline',
    // prompt: 'consent',
    scope: ['openid', 'email', 'profile']
  })
}

export async function loginWithGoogle(code: string): Promise<IUserInfo> {
  // Exchange authorization code for access token
  const { tokens } = await client.getToken(code)
  const idToken = tokens.id_token
  if (!idToken) {
    throw new AuthError('Invalid id_token')
  }

  // Verify the token and get user information
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID
  })

  const payload = ticket.getPayload()
  const { name, email, picture } = payload ?? {}

  if (!name || !email || !picture) {
    throw new AuthError('Payload is empty on verifyIdToken')
  }

  return {
    name,
    email,
    picture
  }
}

// ======== Definitions ========
export type IUserInfo = {
  name: string
  email: string
  picture: string
}
