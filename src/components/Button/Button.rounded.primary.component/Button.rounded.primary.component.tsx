import React from 'react'
import { ButtonProps } from '../Button.type';

const ButtonRoundedPrimary = (props:ButtonProps) => {
  return (
    <button
      className={`
      pButton 
      h-[50px]  
      ${props.fullWidth ? `w-full` : props.halfWidth ? `w-1/2` : props.Width ? `w-[${props.Width}]`: 'w-auto'}
      px-[40px]
      bg-[var(--light-green)] hover:bg-[var(--secondary-color)]
      text-[var(--secondary-color)] hover:text-slate-50
      rounded-full
      border-[.5px] 
      border-gray-500 hover:border-gray-500 
      `}
      onClick={props.onClick}
    >
      <span>{props.Label ?? 'Label'}</span>   
     { props.setIcon ? props.setIcon : ''}
    </button>
  )
}

export default ButtonRoundedPrimary