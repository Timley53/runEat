import React from 'react'
import PendingWrapper from './PendingWrapper'
import OrderTabHeader from './OrderTabHeader'
import Completedwrapper from './completedwrapper'
import Canceledwrapper from './CanceledWrapper'

function Canceled() {
  return (
    <div className='md:w-[80%] sm:w-[100%]  bg-slate-300 md:mx-4 sm:my-2  rounded-lg sm:min-h-[80vh] sm:mb-10 md:mb-0 p-2'>
      <OrderTabHeader/>

        <Canceledwrapper/>
    </div>
  )
}

export default Canceled