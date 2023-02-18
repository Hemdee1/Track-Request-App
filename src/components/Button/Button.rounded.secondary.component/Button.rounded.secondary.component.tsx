import React from 'react'
import { ButtonProps } from '../Button.type';
import {FaPlay} from 'react-icons/fa'

const ButtonRoundedSecondary = (props: ButtonProps) => {
  return (
    <button
      className={`
        flex items-center align-middle gap-3
        pButton 
        h-[50px]  
        ${props.fullWidth ? `w-full` : props.halfWidth ? `w-1/2` : props.Width ? `w-[${props.Width}]`: 'w-auto'}
        px-[40px]
        bg-[transparent] hover:bg-slate-100
        text-[var(--secondary-color)]
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

export default ButtonRoundedSecondary