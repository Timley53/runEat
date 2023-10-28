import { Cartprops } from '@/app/interface';
import React from 'react'

interface Props {
    search: string;
    setSearch:React.Dispatch<React.SetStateAction<string>> ;
}

function SearchInput({search, setSearch} : Props) {
  return (
    <input  type='text' placeholder='Chicken' value={search} onChange={(e)=>setSearch(e.target.value)}  className='p-2 bg-slate-200 rounded-md text-sm w-full focus-within:outline-none'/>
  )
}

export default SearchInput