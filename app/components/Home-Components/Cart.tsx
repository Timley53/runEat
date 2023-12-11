"use client"

import { Cartprops, OrderType } from '@/app/interface'
import React, { useState } from 'react'
import CartComp from '../CartComp/CartComp'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { MdCancel } from 'react-icons/md'
import { AiOutlineClear } from 'react-icons/ai'
import generateUniqueId from 'generate-unique-id'
import { addOrder, clearCart, setCheckOrder, singInG } from '@/app/GlobalRedux/slice/userSlice'
import {onAuthStateChanged} from 'firebase/auth'
import CheckoutModal from './CheckoutModal'
import { auth } from '@/app/resource/firebase'
import Router from 'next/router'
import Link from 'next/link'

interface CartAndModal extends Cartprops {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,  
   setCheckoutDetail: React.Dispatch<React.SetStateAction<OrderType | null>>,
    checkoutDetails: OrderType | null
}

export const createDate: () => string = () => {
const day = new Date().getDate() + ''
const month = new Date().getMonth() + ''
const year = new Date().getFullYear() + ''

  const date = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`

  return date
}



function Cart({showCart, setShowCart, isOpen, setIsOpen, setCheckoutDetail, checkoutDetails}: CartAndModal) {
  const cart =  useSelector((state: Rootstate) => state.user.cart)
  const userGlobal = useSelector((state: Rootstate) => state.user )

  const dispatch = useDispatch()
  

  


  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }


  const checkOutOrder = () => {

    // =============

    const total = cart?.reduce((acc, curr) =>{
      return acc + (curr.price * curr.quantity)
    }, 0) 

    if(cart.length < 1) return

    const newOrder:OrderType = {
      id: generateUniqueId({
        length: 9,
        useLetters: true,
        useNumbers: true,
      }),
      OverallPrice: cart?.reduce((acc, curr) =>{
        return acc + (curr.price * curr.quantity)
      }, 0) 
   ,
      time: createDate(),
      pending: true,
      completed: false,
      canceled: false,
      orderedBy: '',
      orders: [...cart],
      address: ''
    }

    
        dispatch(setCheckOrder(newOrder))
        window.location.href = '/Checkout'

        // Router.push('/Checkout')
        // window.location('Checkout')

      
  }

  return (
    <div className={`bg-slate-100 md:h-screen md:w-[30%] md:max-w-[320px] md:min-w-[280px]  sm:w-[100%] sm:h-[100%]  md:sticky md:top-0 flex-col items-center  md:right-0 ${showCart ? 'sm:flex md:flex' : 'sm:hidden md:flex'} py-2 `}>
    

    <div className="flex w-[100%]   items-center">
      <button   className='md:hidden inline self-start p-2 text-2xl text-rose-500' onClick={()=>setShowCart(!showCart)}><MdCancel/></button>

    <span className='mx-auto'>My Carts</span>
    </div>


    <div className="w-full cart-scroll h-[400px] overflow-y-scroll flex-col flex">

{
  cart?.map( car => <CartComp key={car.id} {...car}/> )
}
    </div>


    <div className="check-out flex flex-col w-full sm:mb-8 md:mb-0">
  <div className="cart-total flex w-full justify-between p-3">
    <span className='font-bold text-sm'>Cart total:</span>
    <span className='text-sm'>${formatNumber( cart?.reduce((acc, curr) =>{
      return acc + (curr.price * curr.quantity)
    }, 0))}</span>
  </div>

  

  <div className="total flex justify-between text-sm p-3 border border-r-0 border-l-0 my-1">
    <span>Total</span>
    <span>${cart?.reduce((acc, curr) =>{
      return acc + (curr.price * curr.quantity)
    }, 0) + (cart?.length * 2) }</span>
  </div>


    
    <div className="w-full flex px-2">
<button  className={` ${cart.length < 1 ? "hidden" : ''} bg-orange-500 text-white hover:bg-orange-400 mx-auto text-center my-4 p-2 w-[80%] rounded-sm`} onClick={()=>checkOutOrder()}>Checkout</button>
{/* href={'/Checkout'} */}

<span className={` ${cart.length < 1 ? "hidden" : ''} p-2 px-3 mx-2 bg-rose-500 self-center rounded-sm  hover:bg-rose-400 text-white`} onClick={()=> dispatch(clearCart())}>
  <AiOutlineClear/>
</span>
    </div>



    </div>
    
    </div>
  )
}

export default Cart