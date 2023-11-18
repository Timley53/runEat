// "use client"

import exp from 'constants';
import Link from 'next/link';
import React from 'react'
import {FaHamburger} from 'react-icons/fa'
import {BiCart, BiMenuAltLeft} from 'react-icons/bi'
import {AiOutlineHome} from 'react-icons/ai'
import {PiBellRingingBold} from 'react-icons/pi'
import { usePathname } from 'next/navigation';
import { MdFavorite, MdOutlineFavorite, MdShoppingCart } from 'react-icons/md';
import { GrCart, GrFavorite } from 'react-icons/gr';

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
   

    <article className={`text-2xl mt-9 md:flex  w-full ${expand ? 'md:justify-start sm:justify-center': "justify-center"}  md:pl-2 cursor-pointer  sm:hidden  transition-all`} 
    onClick={()=> setExpand(!expand)}
    >
    <span>
      <BiMenuAltLeft/>
    </span>

      <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 ` }>
      Expand
    </span>
    </article>

      <Link  href={'/'} className={`md:my-5 flex  w-full  ${expand ? 'md:justify-start sm:justify-center': "justify-center"} md:pl-2 ${pathname === '/' ? active: '' } transition-all`}>
    <span className={``}>
    <AiOutlineHome/>
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 ` }>
      Home
    </span>
      </Link>
        
        
      <Link  href={'/Orders'} className={`md:my-5 flex  w-full  ${expand ? 'md:justify-start sm:justify-center': "justify-center"} md:pl-2 ${pathname === '/Orders' ? active: ''} transition-all`}>
    <span className={``}>
    <PiBellRingingBold/>
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 `}>
      Orders
    </span>
      </Link>
        
        
      <Link  href={'/Favorites'} className={`md:my-5 flex  w-full  ${expand ? 'md:justify-start sm:justify-center': "justify-center"}  md:pl-2 ${pathname === '/Favorites' ? active: ''} transition-all`}>
    <span className={``}>
    { pathname === '/Favorites' ? <MdOutlineFavorite/> : <GrFavorite/> }
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 `}>
    Favorites
    </span>
      </Link>
        
        
        
        
      <Link  href={'/Cart'} className={`md:my-5 flex  w-full  ${expand ? 'md:justify-start sm:justify-center': "justify-center"}  md:pl-2 ${pathname === '/Cart' ? active: ''} transition-all`}>
    <span className={``}>
    { pathname === '/Carts' ? <BiCart/> : <MdShoppingCart /> }
    </span>
    <span className={`${expand ? 'md:inline' : 'hidden'} sm:hidden text-base  mx-2 `}>
    Carts
    </span>
      </Link>
        

        

    </nav>
  )
}

export default Nav