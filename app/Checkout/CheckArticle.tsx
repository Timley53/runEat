"use client"
import React from 'react'
import { CartType } from '../interface'
import { useDispatch } from 'react-redux'
import { changeOrderSize, decreaseCartQuant, decreaseCheckOrderQuantity, deleteSingleOrder, increaseCheckOrderQuantity } from '../GlobalRedux/slice/userSlice'
import { MdOutlineCancel } from 'react-icons/md'

function CheckArticle({id, quantity, img,price, title, size}: CartType) {
    const dispatch = useDispatch()
    // console.log(quantity)
  return (
    <article className='flex w-[95%] max-h-40  p-1 my-2 border-2 border-orange-200 rounded-md m-1 bg-orange-50 bg-opacity-60'>


        <div className="p-2 m-1 self-center md:w-[90px] md:h-[90px]">
            <img  src={img}/>
        </div>
        
        <div className="flex flex-col text-sm p-2 w-full">
        <span  className='text-[12px] word-wrap' title={title}>{title}</span> 

        <div className="flex  ">


    <div className="flex w-full mt-5 ml-4 items-center">

<button className='text-2xl text-orange-400 mx-2'  onClick={()=>dispatch(decreaseCheckOrderQuantity(id))}>-</button>

<span className='text-lg'>
    {quantity}
</span>

<button className='text-2xl text-orange-400 mx-2' onClick={()=>dispatch(increaseCheckOrderQuantity(id))}>+</button>

    </div>

    <span className='mt-5'>${quantity * price}</span>
</div> 

<div className="flex mt-4 mx-2">
    <span className='font-bold text-xs'>Size:</span>
    <select onChange={(e)=> dispatch(changeOrderSize({
        id,
        size: e.target.value
    }))} className='text-xs'>
        
        <option className='text-sm'>{size}</option>
        <option className='text-sm' value={'SM'}>SM</option>
        <option className='text-sm' value={'M'}>M</option>
        <option className='text-sm' value={'L'}>L</option>
        <option className='text-sm' value={'XL'}>Xl</option>
    </select>
</div>

        </div>
        <div className="w-[20%] flex justify-end ">

<span onClick={()=>{
    dispatch(deleteSingleOrder(id))
}} className='m-2 cursor-pointer text-xl hover:text-rose-200 self-center'>
    <MdOutlineCancel/>
</span>
        </div>
        
    </article>
  )
}

export default CheckArticle