import type { ZodSchema } from 'zod'
import { ValidationFieldsError } from '@/libs/errorHandler'

/* //!  IMPORTANT!!!! 
All validations performed by this function throw an error if the field is not valid. THIS ERROR MUST BE HANDLED BY THE CONTROLLER inside a try/catch block.
*/

export function validateObject<T>({
  zodSchema,
  object
}: IValidateObject<T>): T {
  const zodValidation = zodSchema.safeParse(object)

  if (!zodValidation.success) {
    throw new ValidationFieldsError({
      errors: zodValidation.error.flatten().fieldErrors
    })
  }

  return zodValidation.data
}

// ============================= Definitions ============================= //

type IValidateObject<T> = {
  zodSchema: ZodSchema<T>
  object: T
}
