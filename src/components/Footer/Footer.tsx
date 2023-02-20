import React from 'react'
import SpotifyIcon from '../../assets/SVGs/spotify'

const Footer = () => {
  return (
   <footer className='mt-[100px]'>
    <section className=' border-t-[0.5px] border-slate-400 py-[40px] mx-auto 
    flex sm:flex-row flex-col
    items-center 
    justify-between 
    lg:w-3/4 w-[94%] 
    text-slate-400' >
      <span className='flex items-center gap-5'> <SpotifyIcon />  <p>Music search powered by spotify</p> </span>
      <p>© copyright mxrequest 2023</p>
      </section>
   </footer>
  )
}

export default Footer