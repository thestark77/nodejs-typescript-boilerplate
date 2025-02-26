import type { Request, Response } from 'express'
import { AUTH_URLS, getGoogleLoginUrl, loginWithGoogle } from '@/auth.config'
import { validateObject } from '@/libs/validation/validation'
import { stringSchema } from '@/libs/validation/schemas'
import { handleError } from '@/libs/errorHandler'

export async function getLoginUrl(req: Request, res: Response): Promise<void> {
  try {
    const loginUrl = getGoogleLoginUrl()
    res.redirect(loginUrl)
  } catch (error) {
    await handleError({
      error,
      message: 'Error on get login url'
    })
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { code } = req.query

  try {
    const validatedCode = validateObject({
      schema: stringSchema,
      object: code as string
    })

    req.session.user = await loginWithGoogle(validatedCode)
    res.redirect(AUTH_URLS.LOGIN_RETURN_URL)
  } catch (error) {
    await handleError({
      error,
      message: 'Error on login callback'
    })
    res.redirect(AUTH_URLS.LOGIN_ERROR_RETURN_URL)
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    req.session.destroy((error) => {
      if (error) {
        const formState = handleError({ error, message: 'Logout error' })
        return res.status(500).json(formState)
      }
    })

    res.redirect(AUTH_URLS.LOGOUT_RETURN_URL)
  } catch (error) {
    await handleError({
      error,
      message: 'Error on logout'
    })
    res.redirect(AUTH_URLS.LOGOUT_ERROR_RETURN_URL)
  }
}
