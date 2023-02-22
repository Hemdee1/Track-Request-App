import React from 'react'
import { ButtonProps } from '../Button.type';
import {BtnLoaderDark} from '../btnLoader';

const ButtonSecondary = (props: ButtonProps) => {
  return (
   <button
   className={`
   ${props.className ?? ''}
    flex items-center justify-center
    pButton 
    h-[60px]  
    ${props.fullWidth ? `w-full` : props.halfWidth ? `w-1/2` : props.Width ? `w-[${props.Width}]`: 'w-auto'}
    bg-[transparent] hover:bg-slate-200
    text-[var(--secondary-color)]
    rounded-md
    hover:border-[.5px] 
    border-gray-500 hover:border-gray-50
    px-[40]
    `}
    onClick={props.onClick}
   >

    {props.isLoading ? <BtnLoaderDark /> : ''}
    {props.Label ?? 'Label'}
   </button>
  )
}

export default ButtonSecondary