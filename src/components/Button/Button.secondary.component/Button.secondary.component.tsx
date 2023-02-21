import React from 'react'
import { ButtonProps } from '../Button.type';
import {BtnLoaderDark} from '../btnLoader';

const ButtonSecondary = (props: ButtonProps) => {
  return (
   <button
   className={`
    flex items-center align-middle
    pButton 
    h-[60px]  
    ${props.fullWidth ? `w-full` : props.halfWidth ? `w-1/2` : props.Width ? `w-[${props.Width}]`: 'w-auto'}
    px-[60px]
    bg-[transparent] hover:bg-slate-200
    text-[var(--secondary-color)]
    rounded-md
    hover:border-[.5px] 
    border-gray-500 hover:border-gray-500 
    `}
    onClick={props.onClick}
   >

    {props.isLoading ? <BtnLoaderDark /> : ''}
    {props.setIcon ? <img className='mr-[25px]' src={props.icon} alt={props.altText}/> : ''}
    {props.Label ?? 'Label'}
   </button>
  )
}

export default ButtonSecondary