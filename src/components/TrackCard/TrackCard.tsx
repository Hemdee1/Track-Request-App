import React from 'react'
import Pulse from '../Pulse'
import AlbumArt from '../../assets/Images/album-cover.png'

const TrackCard = () => {
  return (
    <div className='flex items-center'>
      <Pulse type='played'/>

      <div className='
          flex items-center md:gap-5 gap-2 
          border-[2px]
          md:p-2 p-2 
          rounded-full 
          md:w-[300px] min-w-auto max-w-[80%]
          pr-10
        '>
        <div className="
          image 
          md:w-[80px] w-[55px]
          rounded-full 
          overflow-hidden
        ">
          <img src={AlbumArt} alt="song title"/>
        </div>

        <div className="details">
          <p className="songTitle">Terminator</p>
          <p className="artistName text-stone-400">Asake</p>
        </div>
      </div>
    </div>
  )
}

export default TrackCard