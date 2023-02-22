import React, {useState} from 'react'
import Tag from '../../components/Tag/Tag'
import { widthSetter } from '../../utils'
import TrackCard from '../../components/TrackCard'
import { Input, Message } from '../../components'
import ClubInfoCard from '../../components/ClubInfoCard';
import Image from '../../assets/Images/emptyy.png';
import Photo from '../../assets/Images/album-cover.png'


const Clubpage = () => {

  const [search, setSearch] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
  };

  const arr = new Array('played', 'queued', 'unavailable', 'queued')
  return (
    <>
      <section className={`${widthSetter} mx-auto mt-[150px] flex flex-wrap`}>
        <div className=' w-[90%] md:w-[60%] mx-auto'>
          <ClubInfoCard clubPhoto={Photo} clubUserName='Quilox' clubSocials={{twitter: '/', instagram: '/', facebook: '/'}} />
          <div>
          <form className='w-[94%]'>
          <Input
            label="Search"
            name="Search"
            type="text"
            value={search}
            placeholder="Search track"
            onChange={handleSearchChange}
            autocomplete="off"
            required
            />
          </form>

            <p className='text-slate-500 my-2'>Search for tracks and click on the result to request them</p>
            <Tag content={'04:58 until you can request again'} isFilled={true} className='my-5'/>
          </div>
        </div>

        {/* request list */}
        <div className='w-[96%] mx-auto md:w-[40%] md:mt-0 mt-10 md:border-l-[1px] border-slate-200 md:pl-10'>
          <div className='flex items-center justify-between'> <p>Requests</p> <Tag content="2/5" isFilled={false}/></div>

          <div className='w-full mt-10 md:max-h-[50vh] md:overflow-y-scroll'>
            {
              !isEmpty ? arr.map( (item, index )=> {
                return <TrackCard title="Terminator" artist="Asake" cover={Photo} type={`${item}`} isResult={false} key={index} className='my-2'/> 
              })
              : <Message image={Image} text='You currently have not made any track requests, your requests will be displayed in this section'/>


            }
          </div>
        </div>
        
      </section>
    </>
  )
}

export default Clubpage