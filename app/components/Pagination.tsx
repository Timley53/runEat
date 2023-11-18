"use client"

import React, {useState} from 'react' 
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export interface PaginationType {
    currentPage: number,
    setCurrentPage:  React.Dispatch<React.SetStateAction<number>>;
    pages: number

}


function Pagination({currentPage, setCurrentPage, pages}: PaginationType) {



    const next = () => {
        setCurrentPage(currentPage + 1)
    }

    const prev = () => {
        setCurrentPage(currentPage - 1)
    }



  if(currentPage === 1 && pages === 1) return <></>
  
  if(currentPage === 1 && currentPage < pages) {return ( <div className='w-full h-[90px] justify-center items-center flex mb-5'>
        <span className='inline'>
            <small>
                {currentPage}
            </small> / <small>
                 {pages}
                </small>
        </span>
        <button className='p-1 px-4 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white flex items-center' onClick={() => next()}>
            {currentPage + 1} <span className='ml-2'> <FaArrowRight/> </span>
        </button>
  </div>)
}
  if(currentPage > 1 && currentPage < pages) { 
return  <div className="w-full h-[90px] justify-center items-center flex mb-5">

<button className='p-1 px-4 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white flex  items-center' onClick={() => prev()}>
        <span className='mr-2'>  <FaArrowLeft/> </span> {currentPage - 1}
        </button>
<span className='inline'>
            <small>
                {currentPage}
            </small> / <small>
                 {pages}
                </small>
        </span>
        <button className='p-1 px-4 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white flex items-center' onClick={() => next()}>
            {currentPage + 1} <span className='ml-2'> <FaArrowRight/> </span>
        </button>
    </div>
  }

  if(currentPage > 1 && currentPage >= pages) {
    return (
        <div className='w-full h-[90px] justify-center items-center flex mb-5'>

<button className='p-1 px-4 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white flex  items-center' onClick={() => prev()}>
        <span className='mr-2'>  <FaArrowLeft/> </span> {currentPage - 1}
        </button>
        
        <span className='inline text-sm'>
            <small>
                {currentPage}
            </small> / <small>
                 {pages}
                </small>
        </span>
       
  </div>
    )
  }
  
}

export default Pagination