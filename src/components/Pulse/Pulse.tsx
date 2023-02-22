import {useState, useEffect, memo} from 'react'
import PendingSvg from '../../assets/SVGs/pending.svg';
import { PulseProp } from './pulse.type';
import Played from '../../assets/SVGs/played';
import Notfound from '../../assets/SVGs/notfound';

const Pulse = memo(function Pulse ({type, color}:PulseProp) :JSX.Element{
  const [status, setStatus] = useState<PulseProp>({type: type, color: "#F2B71E"});  
  useEffect( ()=> {
     if(type === 'played'){ setStatus({type: "played",color: "#35CA8B"})}
     else if(type === 'unavailable') setStatus({type: "queued", color: "#F24E1E"})
     else {setStatus({type: "unavailable", color: "#F2B71E"})}
    
  }, []);
  const FakeArray = new Array(1,2,3)

  return (
    <div className='flex items-center justify-center w-[100px] h-[100px] relative'>
    {
      FakeArray.map((item, index) => {
        console.log(index)
        return <span key={index} className={`animate-ping absolute h-[50px] w-[50px] rounded-full opacity-20`} style={{animationDuration: (index+2)+'s', background: status.color}}></span>
      })
    }
    <span className="z-40 flex">
    { status.type === "queued" ? <PendingSvg/> : ''}
    { status.type === "played" ? <Played /> : ''}
    { status.type === "unavailable" ? <Notfound /> : ''}
    </span>

    </div>
  )
})

export default Pulse