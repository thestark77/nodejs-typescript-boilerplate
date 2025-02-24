export type FormState<Fields, Data = null> = {
  errors?: {
    [K in keyof Fields]?: string[]
  }
  warning?: string | null
  message?: string | null
  data?: Data | null
}
