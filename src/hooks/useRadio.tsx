import { useState, FormEvent } from 'react';

interface RadioTypes {
  value: boolean;
  onChange: (e:FormEvent<HTMLInputElement>) => void
}
export default function useRadio(initialValue:boolean):RadioTypes {
  const [value, setValue] = useState(initialValue);

  function handleChange(e:FormEvent<HTMLInputElement>){
    setValue(e.currentTarget.checked)
  }

  const RadioProps = {
    value: value,
    onChange: handleChange,
  }
  return RadioProps

}
