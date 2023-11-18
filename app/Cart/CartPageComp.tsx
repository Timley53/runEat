import { addCart, addFavorite, changeSize, decreaseCartQuant, deleteCart, increaseCartQuant } from '@/app/GlobalRedux/slice/userSlice'
import { Rootstate } from '@/app/GlobalRedux/store'
import { InitialStateType, pizzaType, pricedDataType } from '@/app/interface'
import React from 'react'
import  { BsCart4, BsFillCartPlusFill } from "react-icons/bs"
import  { GrFavorite } from "react-icons/gr"
import {useSelector, useDispatch} from 'react-redux'
import { CartType } from '@/app/interface'
import Link from 'next/link'
import { MdFavorite, MdOutlineCancel } from 'react-icons/md'
import { showCartNotification } from '@/app/GlobalRedux/slice/uiSlice'



function CartPageComp({id, quantity, img,price, title, size}:  CartType) {
    const dispatch = useDispatch()
    console.log(quantity)
  return (
    <article className='flex md:max-w-[320px] md:min-w-[200px] sm:w-[90%]  max-h-40  p-1 my-2 border-2 border-orange-100 rounded-md m-2 items-center bg-orange-50 '>


       <img src={img} title={title}  className="w-[100px] h-full  object-contain rounded-md"/>
        
        <div className="flex flex-col text-sm p-2 w-full">
        <Link href={`/Details/${id}`} className='text-[12px] word-wrap' title={title}>{title}</Link> 

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

<div className="flex mt-4 mx-2">
    <span className='font-bold text-xs'>Size:</span>
    <select onChange={(e)=> dispatch(changeSize({
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
    dispatch(deleteCart(id))
}} className='m-2 cursor-pointer text-xl hover:text-rose-200 self-center'>
    <MdOutlineCancel/>
</span>
        </div>
        
    </article>
  )
}

export default CartPageComp