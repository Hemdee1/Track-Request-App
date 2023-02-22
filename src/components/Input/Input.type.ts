export type InputFieldProps = {
    name: string
    label: string
    value: string
    onChange: (value: string) => void
    type: 'text'| 'password',
    placeholder?: string
    error?: string
    required: boolean
    autocomplete?: string
    customStyle?: React.CSSProperties;
  }
  