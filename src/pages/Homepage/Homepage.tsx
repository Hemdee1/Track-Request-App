import React from 'react'
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import TrackCard from '../../components/TrackCard';
import { Button } from '../../components';
import Image from '../../assets/Images/album-cover.png'
import RoundedRectangleSVG from '../../assets/SVGs/RoundedRectangleSVG';

const HomePage = () => {
  return (
    <>
    <AnimatedBackground />
    <section className='xl:w-[1200px] sm:w-3/4 w-[96%] mx-auto flex flex-wrap items-center xl:justify-between justify-center md:min-h-[64vh] h-auto'>
      <div className='xl:w-[45%] lg:[45%] w-[100%] lg:mt-[100px] mt-[150px]'>
        <h1 className=' text-4xl text-slate-500'>An easy way to receive and <span className='text-[var(--primary-color)]'>manage song requests</span>  from your audience</h1>
        <p className='text-slate-500 mt-5'>Get Apply For Work Permit In USA. Discover Millions Of Results Here. Powerful and Easy to Use. 100+ Qualitative Results. Get More Related Info. Discover Quality Results. Find Related</p>

        <div className='mt-10'><TrackCard /></div>
        <Button type='primary' Label='Get started' className='mt-10'/>
      </div>



      <div className='xl:w-[40%] lg:[45%] sm:w-[45%] w-[100%] lg:mt-20 mt-20 relative'>
        <figure className='grid grid-flow-row grid-cols-2 gap-5 '>
          <img src={Image} alt={'image title'} className='w-[250px] rounded-3xl'/>
          <img src={Image} alt={'image title'} className='w-[250px] row-span-2 h-[80%] object-cover mt-10 rounded-3xl border-4 border-[var(--primary-color)]'/>
          <img src={Image} alt={'image title'} className='w-[250px] rounded-3xl'/>
        </figure>

        <RoundedRectangleSVG className="absolute -bottom-[35%] left-[30%] w-[45%] animate-pulse  "/>
      </div>

     
    </section>
    </>
  )
}

export default HomePage;