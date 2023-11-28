import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

interface SearchCloseBtnType {
    isSearch: boolean;
    setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchCloseBtn({isSearch,setIsSearch } : SearchCloseBtnType) {

    if(isSearch) return (
        <button onClick={(e)=> {
           e.preventDefault()
           setIsSearch(false)
        }} className='md:text-lg sm:text-xl mx-2 p-2 md:px-6 sm:px-3 text-rose-700  bg-slate-100 hover:bg-slate-300 rounded-md'>
           <ImCross/>
           </button> )
    
    
    
    return ( <button onClick={(e)=> {
        e.preventDefault()
        setIsSearch(true)
    }} className='text-xl mx-2 p-2 md:px-6 sm:px-3  bg-slate-100 hover:bg-slate-300 rounded-md'>
    <AiOutlineSearch/>
    </button>)

 
}

export default SearchCloseBtn