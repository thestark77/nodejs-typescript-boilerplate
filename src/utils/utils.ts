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
