import React from 'react';
import Photo from '../../assets/Images/album-cover.png'
import Tag from '../Tag/Tag';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ClubInfoProps } from './clubinfo.type';

const ClubInfoCard = (props:ClubInfoProps):JSX.Element => {
  return (
 <div className={`mb-10`}>
    <div className='flex items-center gap-5 w-[94%] mb-5'>
      <div className='flex items-center gap-5'>
        <img src={props.clubPhoto ?? Photo} alt={`alt text`} className='rounded-full w-[50px] md:w-[70px]'/ >
        <Tag isFilled={false} content={props.clubUserName}/>

        {props.clubSocials?.twitter ? <Link to={props.clubSocials?.twitter } target='_blank'><FaTwitter className=' text-[var(--secondary-color)] text-2xl'/></Link> : ''}
        {props.clubSocials?.instagram ?<Link to={props.clubSocials?.instagram } target='_blank'><FaInstagram className='text-[var(--secondary-color)] text-2xl'/></Link>: ''}
        {props.clubSocials?.facebook ? <Link to={props.clubSocials?.facebook } target='_blank'><FaFacebook className='text-[var(--secondary-color)] text-2xl'/></Link>: ''}
      </div>

      <Tag isFilled content='Active' className='max-ml-20 sm:flex hidden'/>
   </div>

   <p className='text-slate-500'>This is the official song request page for {props.clubUserName}</p>
 </div>
  )
}

export default ClubInfoCard