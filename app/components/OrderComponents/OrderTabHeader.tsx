import React from 'react'

function OrderTabHeader() {
  return (
    <div className='flex justify-between p-3  bg-white rounded-lg text-sm text-center'>
    <span className='text-center'>Order Id</span>
    <span className='text-center sm:hidden md:inline'>Ordered by</span>
    <span className='text-center'>Time</span>
    <span className='text-center'>Amount</span>
    <span className='text-center'>Action</span>
</div>  )
}

export default OrderTabHeader