import React from 'react'

function LoadingComp() {
    return ( 
        <article className="LoadingComp flex flex-col sm:h-[250px] md:h-[250px] rounded-md md:w-[9.5rem] md:m-[10px] sm:m-[10px]  sm:w-[44%] outline outline-2   outline-slate-200 ">
         

            <div className='w-full loadingBg rounded-md h-[65%]  loading-img'>
          
            </div>

            <div className="details flex text-sm justify-between p-1 flex-col">
                    <p className='font-bold text-orange-800 text-[12px] loading-p loadingBg'></p>

                    <small className='text-orange-700 loading-small loadingBg my-1'>
                    

                    </small>
            </div>

            <div className="flex justify-between w-full items-center px-1 ">
                <span className='text-sm loading-amount  loadingBg'></span>

            <button className='m-2 self-end text-orange-500 text-2xl my-3 loading-cart loadingBg'>
            </button>
            </div>



        
        
        </article>
  )
}

export default LoadingComp

