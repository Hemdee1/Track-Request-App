import React from 'react';
import './roundedrectanglestyles.css'

interface SVGProps {
  className?: string;
  color?: string
}
const RoundedRectangleSVG = (props:SVGProps):JSX.Element => {
  return (
    <div className={`${props.className}`}>
      <svg width="260" height="523" viewBox="0 0 260 523" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect className="rect" x="10" y="10" width="240" height="503" rx="39" stroke="#35CA8B" strokeWidth="20"/>
      </svg>

    </div>
  )
}

export default RoundedRectangleSVG