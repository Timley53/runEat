"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'
import { addCart, removeFav } from '../GlobalRedux/slice/userSlice'
import { favoriteType, pricedDataType } from '../interface'
import { BsFillCartPlusFill } from 'react-icons/bs'
import Link from 'next/link'
import { GrFavorite } from 'react-icons/gr'
import { MdFavorite } from 'react-icons/md'
import { ImCross } from 'react-icons/im'



function FavoriteComp({ id, img, title,price
} :  favoriteType) {

  const favorite = useSelector((state:Rootstate) => state.user.favorite)
   
  const dispatch = useDispatch()
 
    // console.log(favorite)
 
  const addToCart = ( id: string, quantity:number = 1) => {
    dispatch(addCart({
      id,
      quantity,
      img,
      price,
      title
    }))
  }

 
  return (
    <article className="flex flex-col sm:h-[250px] md:h-[250px] rounded-md md:w-[9.5rem] md:m-[10px] sm:m-[8px] relative sm:w-[44%] outline outline-2   outline-orange-200 "> 

     <button className='bg-orange-100 w-[30px] h-[30px] flex items-center justify-center rounded-full absolute right-2 top-2 cursor-pointer  text-orange-600 transition-all'
    onClick={()=> {
      dispatch(removeFav({id}))
}} >
      <ImCross/>  
    </button> 

    <img src={img} alt={title} className='object-cover w-full rounded-md h-[65%]  ' />

    <Link href={`/Details/${id}`} >
    <div className="details flex text-sm justify-between p-1 flex-col">
            <p className='font-bold text-orange-800 text-[12px]'>{title?.slice(0, 20)}...</p>

            <small className='text-orange-700'>{"runEat"}
            

            </small>
    </div>
    </Link>

    <div className="flex justify-between w-full items-center px-1 ">
        <span className='text-sm'>${price}</span>

    <button className='m-2 self-end text-orange-500 text-2xl my-3' onClick={()=>{
      addToCart(id)
    }}>
        <BsFillCartPlusFill/>
    </button>
    </div>





</article>
  )
}

export default FavoriteComp

