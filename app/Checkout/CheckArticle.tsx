"use client"
import React from 'react'
import { CartType } from '../interface'
import { useDispatch } from 'react-redux'
import { changeOrderSize, decreaseCartQuant, decreaseCheckOrderQuantity, deleteSingleOrder, increaseCheckOrderQuantity } from '../GlobalRedux/slice/userSlice'
import { MdOutlineCancel } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import Image from 'next/image'



function CheckArticle({id, quantity, img,price, title, size}: CartType) {
    const dispatch = useDispatch()
    // console.log(quantity)
  return (
    <article className='flex w-[95%] self-center max-h-40  p-1 my-2 border-2  rounded-md m-1 bg-blue-50 mx-4  bg-opacity-60'>


            <img src={img} alt={title}   className="p-2 m-1 self-center w-[80px] h-[80px]  object-cover"/>
        
        <div className="flex flex-col text-sm p-2 w-full">
        <span  className='text-[11px] word-wrap' title={title}>{title}</span> 

        <div className="flex">

    <div className="flex w-full mt-1 items-center">

<button className='text-2xl text-orange-400 mx-2'  onClick={()=>dispatch(decreaseCheckOrderQuantity(id))}>-</button>

<span className='text-sm'>
    {quantity}
</span>

<button className='text-2xl text-orange-400 mx-2' onClick={()=>dispatch(increaseCheckOrderQuantity(id))}>+</button>

    </div>

</div> 

<span className='text-xs'>Price: ${quantity * price}</span>




        </div>


        <div className="w-[30%] flex flex-col ">

<span onClick={()=>{
    dispatch(deleteSingleOrder(id))
}} className='m-2 cursor-pointer text-xl hover:text-rose-200 self-end'>
    <RxCross2/>
</span>

<div className="flex mt-6 ">
    <span className='font-bold text-xs'>Size:</span>
    <select onChange={(e)=> dispatch(changeOrderSize({
        id,
        size: e.target.value
    }))} className='text-xs bg-transparent border-2'>
        
        <option className='text-sm'>{size}</option>
        <option className='text-sm' value={'SM'}>SM</option>
        <option className='text-sm' value={'M'}>M</option>
        <option className='text-sm' value={'L'}>L</option>
        <option className='text-sm' value={'XL'}>Xl</option>
    </select>

</div>

        </div>
        
    </article>
  )
}

export default CheckArticle