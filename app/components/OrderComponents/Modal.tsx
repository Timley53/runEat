"use client"
import {useContext} from 'react'

import { OrderContext } from '@/app/Context'
import { closeModal } from '@/app/GlobalRedux/slice/uiSlice'
import { Rootstate } from '@/app/GlobalRedux/store'
import { CartType, OrderType } from '@/app/interface'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Context } from 'vm'





export default function OrderModal() {
// const modal = useSelector((state: Rootstate) => state.ui.modal)
const dispatch = useDispatch()
const {modal, setModal, setOrderDetails, orderDetails} = useContext(OrderContext)

// const {id, OverallPrice,time, pending, canceled, completed, orderedBy, orders} = orderDetails

  return (
    <>
   

      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=> null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40   backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel w-full transform overflow-y-auto rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all md:w-[60%] sm:w-[85%] sm:h-[80%]  md:max-w-md md:h-[400px]   flex flex-col ">

                <button className='p-2 text-red-600 self-end  text-base' onClick={() => setModal(false)}>
            <ImCross/>
          </button>


                  <Dialog.Title
                    as="div"
                    className="flex w-full items-center"
                  >
                    <span className='text-lg font-medium leading-6 text-gray-900'>
                    {orderDetails?.pending ? 'Pending Order': orderDetails?.completed ? 'Completed Order': 'Canceled Order'}
                    </span>

                    <span className='mx-5'>
                      Total: 
                    ${orderDetails?.OverallPrice}
                    </span>

                      
                  </Dialog.Title>

                 
                 {
                 orderDetails?.orders.map((order: CartType)=> {
                  return(
                    <div className="flex flex-col my-2 rounded-md bg-slate-100 bg-opacity-0.5 p-2">


                    
                    <article className=" flex ">
                      <span className='font-bold mx-1 text-sm'>Order Title:</span>
                      <p className='mx-1 text-sm'>
  
                      {order.title} 
                      </p>
  
                    </article>
                    
                    <article className='flex mt-2'>
  <span className='font-bold mx-1 text-sm'>Size:</span>
  <p className='text-sm'>{order.size}</p>
  
                    </article>
                    <article className='flex mt-2'>
  <span className='font-bold mx-1'>Quantity:</span>
  <p className='text-sm'>{order.quantity}</p>
  
                    </article>
  
                    <article className='flex mt-2'>
  <span className='font-bold mx-1'>Price:</span>
  <p className='text-sm'>${order.price}</p>
  
                    </article>
                    </div>
                  )
                 })
                 }
                 
                  




                  

                  <div className="mt-4  ">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                      onClick={() => setModal(false)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
