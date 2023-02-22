import React from 'react'
import { TagProps } from './Tag.types';

const Tag = ({className, isFilled, content}:TagProps):JSX.Element => {
  return (
    <div className={` rounded-full border-[var(--primary-color)] w-[max-content] border-[2px] text-slate-500 px-7 py-2 ${className ? className : ''} ${isFilled ? 'bg-[#b6ecd49b]' : ''}`}> {content} </div>
  )
}

export default Tag