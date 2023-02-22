import React from 'react'
import { ButtonProps } from '../Button.type';
import './primaryButton.css'
import BtnLoader from '../btnLoader';

const ButtonPrimary =(props:ButtonProps):JSX.Element => {

  return (
    <button 
    className={`
    flex items-center justify-center
    pButton 
    h-[60px]  
    ${props.fullWidth ? `w-full` : props.halfWidth ? `w-1/2` : props.Width ? `w-[${props.Width}]`: 'w-auto'}
    px-[40px]
    bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]
    text-slate-50
    rounded-md
    ${props.className ?? ''}
    `}

    onClick={props.onClick}
    >
      {props.isLoading ? <BtnLoader /> : ''}
      <span>{props.Label ?? 'Label'}</span>
    </button>
  )
}
export default ButtonPrimary;
