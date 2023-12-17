import { CartType, OrderType } from '@/app/interface'
import React, { Dispatch } from 'react'

interface Prop {
    setOrderInfo: React.Dispatch<React.SetStateAction<boolean>>,
    orderInfo: boolean,
    orderDetails:  OrderType | null | undefined
}

function ModalOrder({setOrderInfo, orderInfo, orderDetails}: Prop) {
  return (
    <div className='w-full flex flex-col mt-2'>
        <header  className='self-start inline p-1 bg-slate-300 rounded-sm'> 
        <button onClick={()=> setOrderInfo(true)} className={`mx-1 text-sm p-1 rounded-sm ${ orderInfo ? "bg-slate-500" : "bg-transparent"}`}>
        Order 
        </button>

        <button onClick={()=> setOrderInfo(false)} className={`mx-1 text-sm p-1 rounded-sm ${!orderInfo ? "bg-slate-500" : "bg-transparent"}`}>
        Order Info
        </button>
        </header>
        <article className='inline p-2 my-1'>
            <span className='mx-1'>Total: </span>
            {
                orderDetails?.orders.reduce((acc, curr) => acc+ (curr.price * curr.quantity) ,0)
            }
        </article>


    {orderInfo && <div className="w-full flex flex-col">
        {
                         orderDetails?.orders.map((order: CartType)=> {
                            return(
                              <div key={order.id} className="flex flex-col my-2 rounded-md bg-slate-100 bg-opacity-0.5 p-2">
          
          
                              
                              <article className=" flex ">
                                <span className='font-semibold mx-1 text-sm'>Order Title:</span>
                                <p className='mx-1 text-sm'>
            
                                {order.title} 
                                
                                </p>
            
                              </article>
                              
                              <article className='flex mt-2'>
            <span className='font-semibold mx-1 text-sm'>Size:</span>
            <p className='text-sm'>{order.size}</p>
            
                              </article>
                              <article className='flex mt-2'>
            <span className='font-semibold mx-1'>Quantity:</span>
            <p className='text-sm'>{order.quantity}</p>
            
                              </article>
            
                              <article className='flex mt-2'>
            <span className='font-semibold mx-1'>Price:</span>
            <p className='text-sm'>${order.price}</p>
            
                              </article>
                              </div>
                            )
                           })
        }

    </div>  }

    {
        !orderInfo  && <div className="w-full flex flex-col">
            <article className='my-2'>
            <span className='mx-1'>Name:</span>{orderDetails?.orderedBy}
            </article>

            <article className='my-2'>
            <span className='mx-1'>Address:</span>{orderDetails?.address}
            </article>
        </div>
    }
        

    </div>
  )
}

export default ModalOrder