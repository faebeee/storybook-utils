export type ValidationResult = {
  messages: ValidationResultMessage[]
  version: string
}

export type ValidationResultMessage = {
  extract: string
  firstColumn: number
  hiliteLength: number
  hiliteStart: number
  lastColumn: number
  lastLine: number
  message: string
  subType: string
  type: string
}
