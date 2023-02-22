import {FormEvent, useState} from 'react'

const useInput = (initialValue:string) => {

  const [value, setValue] = useState(initialValue)

  function handleChange(e:FormEvent<HTMLInputElement>){
    setValue(e.currentTarget.value)
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  }
  return inputProps
}

export default useInput