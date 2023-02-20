import React, {useState} from 'react';
import FullLogo from '../../assets/SVGs/FullLogo';
import LogoIcon from '../../assets/SVGs/LogoIcon';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../Button';
import Hamburger from 'hamburger-react';

const Navbar = ():JSX.Element => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeMenu = ()=> setIsOpen(false);

  return (
    <nav className=' lg:h-[100px] flex items-center justify-center overflow-x-hidden bg-white z-[1000] absolute w-full top-0 ]'>
     <div className="navbarContent  items-center justify-between w-3/4 lg:flex hidden">
        <Link to="/" className="brand">
            <FullLogo />
        </Link>

        <div className="links flex">
          <ul className='flex gap-20 text-slate-500'>
            <li><NavLink to="/" className={({isActive}) => isActive ? ' text-[var(--primary-color)]' : ''}>Home</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? ' text-[var(--primary-color)]' : ''}>About</NavLink></li>
          </ul>
        </div>

        <div className="cta flex gap-5">
          <NavLink to="/register" className={({isActive}) => isActive ? ' text-[var(--primary-color)]' : ''}><Button type='secondary' Label='Create club profile'/></NavLink>
          <NavLink to="/login" className={({isActive}) => isActive ? ' text-[var(--primary-color)]' : ''}><Button type='primary' Label='Login'/></NavLink>
        </div>

     </div>

    {/* Mobile navigation */}
     <section className="mobile-menue lg:hidden flex flex-col w-full z-[1000] h-auto">

        <div className="mobile-menue-top w-[96%] flex mx-auto items-center justify-between h-[100px]">
          <Link to="/" className="brand">
              <LogoIcon />
          </Link>

          <div className="mobile-cta flex items-center gap-2">
          <NavLink to="/register" className={`${ isOpen ? 'hidden' : 'flex'}`}><Button type='secondary' Label='Create club profile'/></NavLink>
          <span className=''><Hamburger toggled={isOpen} toggle={setIsOpen}/></span>
          </div>
        </div>

        <div className={`menu-items top-[100px] w-full bg-white ${isOpen ? 'translate-x-[0%] h-[calc(100vh-100px)]' : '-translate-x-[100%] h-0'}`}>
          <ul>
            <li className='w-full h-[80px]'><NavLink to="/" 
            className={({isActive}) => isActive ? ` h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7 ` : `
            h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7
            `} onClick={closeMenu}>Home</NavLink></li>

            <li className='w-full h-[80px]'><NavLink to="/about" 
            className={({isActive}) => isActive ? ` h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7 ` : `
            h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7
            `} onClick={closeMenu}>About</NavLink></li>


            <li className='w-full h-[80px]'><NavLink to="/register" 
            className={({isActive}) => isActive ? ` h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7 ` : `
            h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7
            `} onClick={closeMenu}>Create club profile</NavLink></li>

            <li className='h-[80px] mt-5 flex items-center px-7'><NavLink className='w-full' to="/login"><Button type='primary' fullWidth={true} Label='Login'/></NavLink></li>
          </ul>

          <p className="copyright text-slate-400 w-full text-center absolute bottom-10">© copyright mxrequest 2023</p>
        </div>
     </section>
    </nav>
  )
}

export default Navbar