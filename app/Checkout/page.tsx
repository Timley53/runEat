"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'
import CheckArticle from './CheckArticle'
import { addOrder, clearCart, clearOrder, getState } from '../GlobalRedux/slice/userSlice'
import Pagination from '../components/Pagination'
import AddressInput from './AddressInput'
import Link from 'next/link'


function Checkout() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [address, setAddress] = useState<string>('')
    const cartOrder = useSelector((state: Rootstate) => state.user.checkoutList)
  const userGlobal = useSelector((state: Rootstate) => state.user )

  const dataPerPage = 3;
  const pages = Math.ceil(cartOrder ? cartOrder.orders.length/ dataPerPage : 0 )

  const start = (currentPage - 1) * dataPerPage
  const end = currentPage * dataPerPage


    console.log(cartOrder)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getState())
    }, [])

    const formSubmitAddress = (e: React.FormEvent)=> {
      e.preventDefault()
      

      dispatch(addOrder({
        ...cartOrder,
         address
      }))
dispatch(clearCart())
dispatch(clearOrder())
      // clearCart()
      

    }
    const shippingFee = cartOrder ? cartOrder?.orders?.length * 0.8: 0;
    const total = cartOrder ? cartOrder?.orders.reduce((acc, curr)=>{
      return acc + curr.price
    } ,0): 0;

  return (
    <div className="w-full md:h-screen sm:h-full check-bg sm:pb-8 md:pb-7 min-h">

    <div className="w-full h-full bg-black bg-opacity-50 backdrop-blur-[2px] flex flex-col justify-center items-center  min-h">

    <h2 className='text-white my-2 text-xl'>Order Details</h2>

      <div className="md:w-[500px] sm:w-[90%] sm:order-2 md:order-1 flex sm:flex-col md:flex-row h-[100%] bg-white bg-opacity-50 sm:items-center md:items-start justify-between rounded-md border border-red-500">

    <form onSubmit={formSubmitAddress} className="md:w-[40%] sm:w-[100%] md:h-[40%] flex items-center flex-col  rounded-md border-2 border-white md:p-1 bg-white sm:self-center md:self-start  md:m-1 bg-opacity-70 sm:mb-6 md:mb-1">
    <h2>Order Total</h2>



      <div className='w-[100%] text-sm'>
      <article className='flex w-full justify-between p-1 my-1  md:text-sm sm:text-base'>
        <span>Order</span>
        <span>${cartOrder?.orders.reduce((acc, curr)=>{
          return acc + curr.price
        } ,0)}</span>
      </article>
      <article className='flex w-full justify-between p-1 my-1 border-b-2'>
        <span>Shipping</span>
        <span>${shippingFee.toFixed(1) }</span>
      </article>
      <article className='flex w-full justify-between p-1 my-1 md:text-sm sm:text-base '>
        <span>Total</span>
        <span>${total}</span>
      </article>
      </div>

    <AddressInput address={address} setAddress={setAddress}/>

      <article className='flex w-full justify-between p-1 my-1 items-center'>
        <Link href={"/"} onClick={()=> dispatch(clearOrder())} className='mt-3 p-1 py-2 px-4 rounded-md bg-rose-400 hover:bg-rose-200 text-center md:text-xs  sm:text-lg transition-all' >Cancel</Link>

        <button className='mt-3 p-2 px-4 rounded-md bg-green-500 hover:bg-emerald-200 text-center md:text-xs sm:text-lg  transition-all' 
        >Pay</button>
      </article>
      
    </form>

    <div className="md:w-[60%]  sm:w-[100%] md:h-[100%] flex flex-col items-center justify-center">

      {
      cartOrder && cartOrder?.orders.length < 1 && <div className="w-full">
        No Order
        </div> || cartOrder && cartOrder.orders.slice(start, end).map((order) => (
          <CheckArticle key={order.id} {...order}/>
        ))
      }

   <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>

    </div>
      </div>


    </div>
        
    </div>
  )
}

export default Checkout

