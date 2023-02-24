import React, { useEffect, useState } from 'react'
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import TrackCard from '../../components/TrackCard';
import { Button } from '../../components';
import Image from '../../assets/Images/album-cover.png'
import RoundedRectangleSVG from '../../assets/SVGs/RoundedRectangleSVG';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { generateToken, checkToken, getNewRelease } from '../../components/API/spotify';
import { Logger, selectRandom } from '../../utils';

interface Release {
  artists: string;
  cover: string;
  title: string
}

const HomePage = () => {
  const navigate = useNavigate();
  const [newRelease, setNewRelease] = useState<Release[]>([])
  const [numbers, setNumbers] = useState<number[]>([])
  const [allNew, setAllNew] = useState([]);


 

  useEffect(()=> {
    const random = selectRandom()
    let token = checkToken(); //access token
   let nr; //new release : nr

    if(!token) {
      const t = generateToken()
      nr = getNewRelease()
      setAllNew(nr);
    }
    nr = getNewRelease();
    setAllNew(nr); //generate an array of random numbers between 1 and 20
    setNumbers([...random])
   },[])

   useEffect( ()=> {
    // Initialize()
    // if(allNew.length < 1) return
    const selectedSongs = allNew.filter( (song:any, index:number) => numbers.includes(index));
    let curr:Release[] = []
    selectedSongs.map( (song:any, index:number) => {
      let feat:string[] = []
      let artist = song.artists.map( (item:any) => {
        feat.push(item.name)
      })
      let feats = feat.join(', ')
      curr.push({
        artists: feats,
        cover: song.images[1].url,
        title: song.name
      })
    });
    setNewRelease(curr)
  }, [allNew])


   Logger({numbers})
   Logger({newRelease})

  return (
    <>
      <AnimatedBackground />
      <section className="xl:w-[1200px] sm:w-3/4 w-[90%] mx-auto flex flex-wrap items-center xl:justify-between justify-center md:min-h-[76vh] h-auto">
        <div className="xl:w-[45%] lg:[45%] w-[100%] lg:mt-[200px] mt-[150px]">
          <h1 className=" text-4xl text-slate-500">
            An easy way to receive and{" "}
            <span className="text-[var(--primary-color)]">
              manage song requests
            </span>{" "}
            from your audience
          </h1>
          <p className="text-slate-500 mt-5">
            Get Apply For Work Permit In USA. Discover Millions Of Results Here.
            Powerful and Easy to Use. 100+ Qualitative Results. Get More Related
            Info. Discover Quality Results. Find Related
          </p>

        {newRelease.map((item, index) => {
          if(index === 1) return <div key={index} className='mt-10'><TrackCard artist={item.artists} title={item.title} cover={item.cover ?? Image} isResult={false}/></div>
        })}
        <Button type='primary' Label='Get started' className='mt-10' onClick={() => navigate('/register')}/>
      </div>



      <div className='xl:w-[40%] lg:[45%] sm:w-[45%] w-[100%] lg:mt-20 mt-20 relative'>
        <figure className='grid grid-flow-row grid-cols-2 gap-5 '>
          { newRelease.map( (item,index) => {
            if(index === 1) return  <img key={index} src={ item.cover ?? Image} alt={'image title'} className='w-[250px] row-span-2 h-[80%] object-cover mt-10 rounded-3xl border-4 border-[var(--primary-color)]'/>
            return (<img key={index} src={item.cover ?? Image} alt={'image title'} className='w-[250px] rounded-3xl'/>)
          })}
        </figure>

          <RoundedRectangleSVG className="absolute -bottom-[35%] left-[30%] w-[45%] animate-pulse  " />
        </div>
      </section>
    </>
  );
};

export default HomePage;
