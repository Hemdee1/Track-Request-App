import React from 'react'
import { RadioProps } from './radio.type'

const Radio = (props:RadioProps):JSX.Element => {

  return (
    <span className='flex items-center gap-2 my-6'>
      <input onClick={props.onClick} type="checkbox" id={props.name} className="form-checkbox w-[20px] h-[20px] rounded text-[var(--primary-color)]" />
      <label htmlFor={`${props.name ?? 'myId'}`}>{props.label}</label>
   
    </span>
  )
}

export default Radio