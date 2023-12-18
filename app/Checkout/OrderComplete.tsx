import Link from 'next/link'
import React from 'react'

function OrderComplete() {
  return (
    <div className='h-screen fixed w-screen flex items-center justify-center bg- bg-opacity-0.8 backdrop-blur-md z-50'>

        <article className='md:w-[30%] sm:w-[45%] max-w-[250px] h-[120px] p-3 bg-slate-300 rounded-md flex flex-col items-center'>
            <h2>Order Successfull</h2>
            <Link href={"/Orders"} className='p-2 bg-emerald-400 rounded-md my-6 hover:bg-emerald-300 transition-all'>Done</Link>
        </article>
        
    </div>
  )
}

export default OrderComplete