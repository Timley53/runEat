"use client"

import { decreaseCartQuant, deleteCart, increaseCartQuant } from '@/app/GlobalRedux/slice/userSlice'
import { CartType } from '@/app/interface'
import { log } from 'console'
import { title } from 'process'
import React, {useState} from 'react'
import {MdOutlineCancel} from "react-icons/md"
import { useDispatch } from 'react-redux'

function CartComp({id, quantity, img,price, title }: CartType) {
    const dispatch = useDispatch()
    console.log(quantity)
  return (
    <article className='flex w-[95%]  p-1 my-2 border-2 border-orange-200 rounded-md m-1'>

        <img src={img} alt="" className='w-[35%] h-[90%] object-cover m-1' />
        <div className="flex w-[40%] flex-col text-sm">
        <span className='text-[12px]'>{title}</span> 

        <div className="flex  ">


    <div className="flex w-full mt-5 ml-4 items-center">

<button className='text-2xl text-orange-400 mx-2'  onClick={()=>dispatch(decreaseCartQuant(id))}>-</button>

<span>
    {quantity}
</span>

<button className='text-2xl text-orange-400 mx-2' onClick={()=>dispatch(increaseCartQuant(id))}>+</button>

    </div>

    <span className='mt-5'>${quantity * price}</span>
</div> 


        </div>
<span onClick={()=>{
    dispatch(deleteCart(id))
}} className=' m-1 self-start  h-full cursor pointer '>
    <MdOutlineCancel/>
</span>
        
    </article>
  )
}

export default CartComp