import type { z } from 'zod'
import { ValidationFieldsError } from '@/libs/errorHandler'

/* //!  IMPORTANT!!!! 
All validations performed by this function throw an error if the field is not valid. THIS ERROR MUST BE HANDLED BY THE CONTROLLER inside a try/catch block.
*/

export function validateObject<Schema extends z.ZodSchema<any>>({
  schema,
  object
}: IValidateObject<Schema>): z.infer<Schema> {
  const zodValidation = schema.safeParse(object)

  if (!zodValidation.success) {
    throw new ValidationFieldsError({
      status: 400,
      errors: zodValidation.error.flatten().fieldErrors
    })
  }

  return zodValidation.data
}

// ============================= Definitions ============================= //
type IValidateObject<Schema extends z.ZodSchema<any>> = {
  schema: Schema
  object: z.infer<Schema>
}
