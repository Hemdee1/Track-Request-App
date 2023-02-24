import React, {useState, useEffect} from 'react'
import {MdOutlineClose} from 'react-icons/md'
import {FaCheckCircle} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import {GoAlert} from 'react-icons/go';

export interface AlertProps {
  type: "failed" | "success" | "warning";
  status: boolean;
  message: string;
}

export interface AlertAltProps extends AlertProps {
  func: (i:boolean)=> void
}
 
const Alert = ({status, type, message, func}:AlertAltProps):JSX.Element => {
  
  const [isClosed, setisClosed] = useState<boolean>(true);
  const close = () => {
    func(true)
  }

  useEffect(()=>{
    setisClosed(status)
  }, [status])


  if(type === "success") return (
    <div className={` ${isClosed ? 'hidden' : ''} `}>
    <div className='my-4 flex items-center justify-between p-6 border-green-600 border-2 rounded-md min-h-[60px] bg-green-100'>
    <div className='flex items-center gap-3'>
    <span><FaCheckCircle className='text-[24px] text-green-600'/></span> 
      <p className='text-green-700'>{message ?? 'This is some error message'}</p> 
    </div>
    <span onClick={close}>  <MdOutlineClose className='text-[24px] text-green-600 cursor-pointer'/> </span>
  </div>
  </div>
  )
  if (type === "failed") return (
    <>
   <div className={` ${isClosed ? 'hidden' : ''} `}>
    <div className='my-4 flex items-center justify-between p-6 border-rose-600 border-2 rounded-md min-h-[60px] bg-rose-100'>
        <div className='flex items-center gap-3'>
          <span><AiFillCloseCircle className='text-[24px] text-rose-600'/></span>
          <p className='text-rose-700'>{message  ?? 'This is some error message'}</p> 
        </div>
        <span onClick={close}>  <MdOutlineClose className='text-[24px] text-rose-600 cursor-pointer'/> </span>
    </div>
    </div>
    </>
  )
  if (type === "warning") return (
    <>
   <div className={` ${isClosed ? 'hidden' : ''} `}>
    <div className='my-4 flex items-center justify-between p-6 border-yellow-600 border-2 rounded-md min-h-[60px] bg-yellow-100'>
        <div className='flex items-center gap-3'>
          <span><GoAlert className='text-[24px] text-yellow-600'/></span>
          <p className='text-yellow-600'>{message  ?? 'This is some error message'}</p> 
        </div>
        <span onClick={close}>  <MdOutlineClose className='text-[24px] text-yellow-600 cursor-pointer'/> </span>
    </div>
    </div>
    </>
  )

  return <></>
}

export default Alert