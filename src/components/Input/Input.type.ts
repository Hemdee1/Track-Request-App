export type InputFieldProps = {
    name: string
    label: string
    value: string
    onChange: (value: string) => void
    type?: string
    placeholder?: string
    error?: string
    required: boolean
    autocomplete?: string
  }
  