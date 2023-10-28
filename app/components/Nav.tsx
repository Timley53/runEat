// "use client"

import exp from 'constants';
import Link from 'next/link';
import React from 'react'
import {FaHamburger} from 'react-icons/fa'
import {BiMenuAltLeft} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {PiBellRingingBold} from 'react-icons/pi'
import { usePathname } from 'next/navigation';

interface Props {
    expand: boolean;
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}




const Nav = ({expand, setExpand}:Props) => {

  const pathname:string = usePathname()
  
  // console.log(pathname === window.location.pathname);

  let active:string = 'md:border-r-4 md:border-r-orange-500 text-orange-500';
  



  

  return (
    <nav 
    
    className={`${expand ? 'md:w-[150px] transition-all': ' md:w-[80px] transition-all'} md:sticky sm:w-[100%] sm:h-[50px] sm:fixed sm:bottom-0 sm:left-0 md:top-0 md:left-0  md:h-screen  sm:z-50 md:flex md:flex-col sm:flex sm:flex-row md:items-center sm:items-center  md:py-2 text-2xl bg-slate-200` }>
   

    <span className='text-3xl mt-9 w-full  justify-center cursor-pointer sm:hidden md:flex' 
    onClick={()=> setExpand(!expand)}
    >
      <BiMenuAltLeft/>
    </span>

      <Link  href={'/'} className={`md:my-5 flex  w-full  justify-center ${pathname === '/' ? active: '' }`}>
    <span className={``}>
    <AiOutlineHome/>
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 ` }>
      Home
    </span>
      </Link>
        
        
      <Link  href={'/Orders'} className={`md:my-5 flex  w-full  justify-center ${pathname === '/Orders' ? active: ''}`}>
    <span className={``}>
    <PiBellRingingBold/>
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 `}>
      Orders
    </span>
      </Link>
        
        
    </nav>
  )
}

export default Nav