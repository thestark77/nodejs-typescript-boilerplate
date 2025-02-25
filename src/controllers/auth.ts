import type { Request, Response } from 'express'
import { loginWithGoogle, type IUserInfo } from '@/auth.config'
import type { FormState } from '@/libs/definitions'
import { validateObject } from '@/libs/validation/validation'
import { authCodeSchema } from '@/libs/validation/schemas'
import { getInitialFormState, sendResponse } from '@/utils/utils'
import { handleError } from '@/libs/errorHandler'

export async function login(req: Request, res: Response): Promise<void> {
  let formState: FormState<undefined, IUserInfo> = getInitialFormState()
  try {
    const { code } = req.query

    const validatedCode = validateObject({
      schema: authCodeSchema,
      object: code as string
    })

    formState.data = await loginWithGoogle(validatedCode)
  } catch (error) {
    formState = await handleError({ error, message: 'Login error' })
  } finally {
    sendResponse({ formState, status: 200, res })
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  req.session.destroy((error) => {
    if (error) {
      const formState = handleError({ error, message: 'Logout error' })
      return res.status(500).json(formState)
    }
  })
}
