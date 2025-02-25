import type { FormState } from '@/libs/definitions'
import type { Response } from 'express'

export function sendResponse<Fields = null, Data = null>({
  formState,
  status,
  res
}: ISendSuccessResponse<Fields, Data>): Response<FormState<Fields, Data>> {
  return res.status(status).json(formState)
}

export function getInitialFormState<Fields, Data = undefined>(
  data?: Data
): FormState<Fields, Data> {
  const defaultFormState: FormState<Fields, Data> = {
    data,
    status: 200
  }

  return defaultFormState
}

export function formatDateToLocal(
  dateStr: Date | string | number,
  locale: string = 'es-MX'
): FormatDateToLocal {
  const incomingDate = new Date(dateStr)

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, dateOptions)
  const timeFormatter = new Intl.DateTimeFormat(locale, timeOptions)
  const date = dateFormatter.format(incomingDate)
  const time = timeFormatter.format(incomingDate)
  return { date, time, dateTime: `${date}, ${time}` }
}

// ============================= Definitions ============================= //
type FormatDateToLocal = {
  date: string
  time: string
  dateTime: string
}

type ISendSuccessResponse<Fields, Data = null> = {
  formState: FormState<Fields, Data>
  status: number
  res: Response
}
