// "use client"

import exp from 'constants';
import Link from 'next/link';
import React from 'react'
import {FaHamburger} from 'react-icons/fa'

interface Props {
    expand: boolean;
    setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}



const Nav = ({expand, setExpand}:Props) => {
  return (
    <nav 
    onClick={()=> setExpand(!expand)}
    className={`${expand ? 'md:w-[15%] transition-all': 'md:w-[80px] transition-all'} md:sticky sm:w-[100%] sm:h-[60px] sm:sticky sm:bottom-0 md:top-0 md:left-0 border-2 border-red-600 md:h-screen  sm:z-50 flex flex-col items-center py-2` }>
      <span className='text-2xl'>
        <FaHamburger/>
      </span>

      <Link  href={'/'}>
        
      </Link>
        
        
    </nav>
  )
}

export default Nav