"use client"

import { Cartprops } from '@/app/interface';
import React, { useEffect, useRef } from 'react'

interface Props {
    search: string;
    setSearch:React.Dispatch<React.SetStateAction<string>> ;
    isSearch: boolean ,
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchInput({search, setSearch, setIsSearch} : Props) {

  const searchRef = useRef<HTMLInputElement>(null) 


  

  useEffect(() => {

    searchRef.current?.addEventListener('focusin', function(e) {

      console.log(this.tagName)

    });

    searchRef.current?.addEventListener('focusout', function(e) {

      console.log(this.tagName)

    });
    
   
   return () => searchRef.current?.removeEventListener('focus', function(e) {
   
  }); 

  }, [])
  


  return (
    <input ref={searchRef} type='text'  placeholder='Chicken' onFocus={()=> setIsSearch(true)} value={search} onChange={(e)=>setSearch(e.target.value)}  className='p-2 bg-slate-200 rounded-md text-sm w-full focus-within:outline-none'/>
  )
}

export default SearchInput