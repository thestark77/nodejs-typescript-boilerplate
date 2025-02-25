import { formatDateToLocal } from '@/utils/utils'
import type { FormState } from '@/libs/definitions'

export async function handleError<Fields>({
  error,
  message
}: IErrorHandler): Promise<FormState<Fields>> {
  const formState: FormState<Fields> = {
    status: 500,
    message: message ?? 'Unknown error'
  }

  if (error instanceof ValidationFieldsError) {
    formState.message = error.message ?? error.description
    formState.errors = error.formState.errors
    formState.status = 400
  } else if (error instanceof AuthError) {
    formState.message = error.message ?? error.description
    formState.status = 401
  } else if (error instanceof NotFoundError) {
    formState.message = error.message ?? error.description
    formState.status = 404
  }

  /* 
  --- JWT errors
  else if (
    error instanceof TokenExpiredError ||
    error instanceof JsonWebTokenError
  ) {
    formState.message = error.message
    formState.status = 401
  } 
  --- Database errors  
  else if (error instanceof UniqueConstraintError) {
    formState.message = 'The record already exists'
    formState.status = 409
  } else if (error instanceof ForeignKeyConstraintError) {
    formState.message =
      'Error creating data, one of the linked records does not exist'
    formState.status = 400
  } else if (error instanceof ValidationError) {
    formState.message = 'Database constraint error, records were not created'
    formState.status = 400
  } else if (error instanceof EmptyResultError) {
    formState.message = 'Database error, the record does not exist'
    formState.status = 404
  } else {
    formState.message = 'A database error occurred'
  } */

  console.error(`${formatDateToLocal(new Date()).dateTime}\n`, error)
  // TODO: Error trace

  return formState
}

const errorsDictionary = {
  auth: {
    name: 'AuthError',
    description: 'Error on authentication'
  },
  validation: {
    name: 'ValidationFieldsError',
    description: 'Error on request fields'
  },
  notFound: {
    name: 'NotFoundError',
    description: 'Resource not found'
  }
}

// ============================= Error classes ============================= //

export class AuthError extends Error {
  description: string
  constructor(message: string) {
    super(message)
    this.name = errorsDictionary.auth.name
    this.description = errorsDictionary.auth.description
  }
}

export class ValidationFieldsError<Errors> extends Error {
  readonly description: string
  public formState: FormState<Errors>
  constructor(formState: FormState<Errors>, message?: string) {
    super(message)
    this.formState = formState
    this.name = errorsDictionary.validation.name
    this.description = errorsDictionary.validation.description
    this.stack = undefined
  }
}

export class NotFoundError extends Error {
  description: string
  constructor(message: string) {
    super(message)
    this.name = errorsDictionary.notFound.name
    this.description = errorsDictionary.notFound.description
  }
}

// ============================= Definitions ============================= //
type IErrorHandler = {
  error: unknown
  message?: string
}
