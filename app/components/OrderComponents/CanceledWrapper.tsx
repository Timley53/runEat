"use client"

import React from 'react'
import PendingComp from './PendingComp'
import { useSelector } from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { CartType, OrderType } from '@/app/interface'

function Canceledwrapper() {
    const Orders = useSelector((state: Rootstate) => state.user.Orders)
    return (
      <div className='wrapper-pag flex flex-col h-full '>
  
          <div className="flex flex-col w-full h-[80%]  ">
  
            {
             
             Orders.filter((order: OrderType) => order.canceled === true).length < 1 && <div className='w-full h-full flex items-center justify-center m-auto sm:my-10 md:my-auto'>
                <h2 className="m-auto">No Canceled Orders</h2>
             </div> || Orders.filter((order: OrderType) => order.canceled === true).length > 0 && Orders.filter((order: OrderType) => order.canceled === true).map(order => <PendingComp key={order.id} {...order}/>)
            }
  
              
  
          </div>
  
          <div className="pagination">
  
          </div>
          
      </div>
  )
}

export default Canceledwrapper