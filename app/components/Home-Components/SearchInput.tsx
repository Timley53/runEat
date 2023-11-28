import { Cartprops } from '@/app/interface';
import React from 'react'

interface Props {
    search: string;
    setSearch:React.Dispatch<React.SetStateAction<string>> ;
    isSearch: boolean ,
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchInput({search, setSearch, setIsSearch} : Props) {
  return (
    <input  type='text' placeholder='Chicken' onFocus={()=> setIsSearch(true)} value={search} onChange={(e)=>setSearch(e.target.value)}  className='p-2 bg-slate-200 rounded-md text-sm w-full focus-within:outline-none'/>
  )
}

export default SearchInput