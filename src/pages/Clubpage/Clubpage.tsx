import React, {useState, useEffect} from 'react'
import Tag from '../../components/Tag/Tag'
import { widthSetter } from '../../utils'
import TrackCard from '../../components/TrackCard'
import { Input, Message } from '../../components'
import ClubInfoCard from '../../components/ClubInfoCard';
import Image from '../../assets/Images/emptyy.png';
import Photo from '../../assets/Images/album-cover.png'
import { searchTracks } from '../../components/API/spotify'
import { Logger } from '../../utils'
import Alert, { AlertProps } from '../../components/Alert/Alert';

export interface TrackInterface {
  cover: string;
  artists: string;
  trackname: string
}

interface Tx{
  mins: number,
  secs:number,
  canRequest: boolean,
}
export interface RequestedTracksProps extends TrackInterface {
  status: 'queued' | 'played' | 'unavailable';
}
const Clubpage = () => {

  const [search, setSearch] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [getTracks, setTracks] = useState<TrackInterface[]>([])
  const [currSelect, setCurrSelect] = useState<number>()
  const [requestedTracks, setRequestedTracks] = useState<RequestedTracksProps[]>([])
  const [limitReached, setLimitReached] = useState<boolean>(false)
  const [numOfTracks, setNumOfTracks] = useState<number>(0)
  const [max, setMax] = useState<number>(10)
  const [getErrors, setErrors] = useState<AlertProps>({type: "warning", status: true, message: 'Club / DJ session request limit of 10 tracks request reached'});
  const [getReqErrors, setReqErrors] = useState<AlertProps>({type: "warning", status: true, message: 'You recently made a request which have been queued, you will be able to make another request when the timer ends'});
  const [time, setTime] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [canRequest, setCanRequest] = useState<boolean>(true)


  const getTimer = () => {
    let t = localStorage.getItem('timer');
    if(t) return JSON.parse(t)
    return undefined
  }

  const SetTimer = (data:Tx) => {
    localStorage.setItem('timer', JSON.stringify(data))
  }

  const waitTime = 5; // countdown time


    



  const handleSearchChange = (newValue: string) => {
    if(limitReached) {
      setErrors({...getErrors, status: false})
      return
    }

    if(!canRequest){
      setReqErrors({...getReqErrors, status: false});
      return
    }
    setSearch(newValue);
    // if(tracks) setTracks([...tracks]);
  };

  useEffect( ()=> {
    console.log(search)
    const trackss = searchTracks(search)
    if(trackss) setTracks(trackss)
  }, [search])

  const userSelectioin = (index:number) => {
    setCurrSelect(index)
  } 

  const confirmSelection = (item:TrackInterface) => {
    if(limitReached) return 

    let lst = getTimer();
    if(lst) SetTimer({...lst, mins:0});

    setMins(waitTime)

    let rq:RequestedTracksProps[] = [...requestedTracks, {...item, status:'queued' }]
    localStorage.setItem('requested_tracks', JSON.stringify(rq))
    setCurrSelect(undefined)
    setSearch('')
    if(numOfTracks < max) setNumOfTracks(numOfTracks + 1)
    setRequestedTracks([...rq])

  }

  useEffect( ()=> {
    const availableTracks = localStorage.getItem('requested_tracks');
    if(availableTracks === "null" || !availableTracks) {
      localStorage.setItem('requested_tracks', JSON.stringify(requestedTracks) );
    } else {
      setRequestedTracks([...(JSON.parse(availableTracks))])
      setNumOfTracks(JSON.parse(availableTracks).length)
    }

    if(numOfTracks >= max) setLimitReached(true)
    
  }, [numOfTracks]);

  console.log({requestedTracks})


  function CloseError(data:boolean){
    setErrors({...getErrors, status:data})
  }
  function CloseReqError(data:boolean){
    setReqErrors({...getReqErrors, status:data})
  }

  
  return (
    <>

 
     
      <section className={`${widthSetter} mx-auto mt-[150px] flex flex-wrap`}>
        <div className=' w-[90%] md:w-[60%] mx-auto relative pr-[0px] sm:pr-[5%]'>
          <ClubInfoCard clubPhoto={Photo} clubUserName='Quilox' clubSocials={{twitter: '/', instagram: '/', facebook: '/'}} />
          <div>
          <Alert {...getErrors} func={CloseError} />
          <Alert {...getReqErrors} func={CloseReqError} />
          <form className='w-[100%]'>
          <Input
            label="Search"
            name="Search"
            type="text"
            value={search}
            placeholder="Ex: Artist name - track title"
            onChange={handleSearchChange}
            autocomplete="off"
            required
            />
          </form>

             

            <p className='text-slate-500 my-2'>Search for tracks and click on the result to request them</p>
            {!canRequest ? <Tag content={`${mins}:${secs}s until you can request again`} isFilled={true} className='my-5'/> : ''}
          </div>

          {/* results */}
           {
            search.length > 0 ?
            <section className='z-[500] h-[400px] w-full absolute overflow-y-scroll bg-white shadow-lg p-3 sm:p-10 rounded-xl border-[1px]
            '>
            <div>
              {getTracks.map((item, index):JSX.Element => {
                return <div className='flex min-w-full overflow-x-hidden my-2'>
                    <span onClick={() => userSelectioin(index)} className={` cursor-pointer ${ currSelect === index ? 'min-w-[calc(100%-300px)]' : 'min-w-full'}`} ><TrackCard key={index} isResult={true} cover={item.cover} title={item.trackname} artist={item.artists} className='rounded-lg hover:border-[var(--primary-color)] hover:border-2'/> </span><div className='text-rose-800 rounded-xl flex items-center justify-center min-h-full min-w-[150px] bg-rose-300 border-rose-700 border-[1px] cursor-pointer'
                    onClick={() => setCurrSelect(undefined)}
                    >Cancel</div> 
                    
                    <div
                   className='text-green-800 rounded-xl flex items-center justify-center min-h-full min-w-[150px] bg-green-300 cursor-pointer'
                   onClick={() => confirmSelection(item)}
                   >Confirm</div>
             
                </div>
              }) }
            </div>
            </section>
            :
            <></>
           }
              {/* end of results */}
        </div>

        {/* request list */}
        <div className='w-[96%] mx-auto md:w-[40%] md:mt-0 mt-10 md:border-l-[1px] border-slate-200 md:pl-10'>
          <div className='flex items-center justify-between'> <p>Requests</p> <Tag content={`${numOfTracks} / ${max}`} isFilled={false}/></div>

          <div className='w-full mt-10 md:max-h-[50vh] md:overflow-y-scroll'>
            {
              (requestedTracks.length > 0) ? requestedTracks.map( (item:RequestedTracksProps, index:number)=> {
                return <TrackCard title={item.trackname} artist={item.artists} cover={item.cover} type={`${item.status}`} isResult={false} key={index} className='my-2 min-w-full'/> 
              })
            ) : (
              <Message
                image={Image}
                text="You currently have not made any track requests, your requests will be displayed in this section"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Clubpage;
