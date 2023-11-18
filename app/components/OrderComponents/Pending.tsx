import React from 'react'
import PendingWrapper from './PendingWrapper'
import OrderTabHeader from './OrderTabHeader'

function Pending() {
  return (
    <div className='md:w-[80%] sm:w-[100%]  bg-slate-300 md:mx-4 sm:my-2  rounded-lg sm:min-h-[80vh] sm:mb-10 md:mb-0 p-2'>
      <OrderTabHeader/>

        <PendingWrapper/>
    </div>
  )
}

export default Pending