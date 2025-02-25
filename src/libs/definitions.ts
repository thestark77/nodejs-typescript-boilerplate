export type FormState<Fields = null, Data = null> = {
  status: number
  errors?: {
    [K in keyof Fields]?: string[]
  }
  message?: string | null
  data?: Data | null
}
