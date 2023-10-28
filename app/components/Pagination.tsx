"use client"

import React, {useState} from 'react' 

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
        <button className='p-1 px-6 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white' onClick={() => next()}>
            {currentPage + 1}
        </button>
  </div>)
}
  if(currentPage > 1 && currentPage < pages) { 
return  <div className="w-full h-[90px] justify-center items-center flex mb-5">

<button className='p-1 px-6 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white' onClick={() => prev()}>
            {currentPage - 1}
        </button>
<span className='inline'>
            <small>
                {currentPage}
            </small> / <small>
                 {pages}
                </small>
        </span>
        <button className='p-1 px-6 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all text-white' onClick={() => next()}>
            {currentPage + 1}
        </button>
    </div>
  }

  if(currentPage > 1 && currentPage >= pages) {
    return (
        <div className='w-full h-[90px] justify-center items-center flex mb-5'>

             <button className='p-1 px-6 rounded-full mx-4 text-sm hover:bg-orange-200 bg-orange-500 transition-all  text-white' onClick={() => prev()}>
            {currentPage - 1}
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