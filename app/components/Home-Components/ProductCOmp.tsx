import { addCart } from '@/app/GlobalRedux/slice/userSlice'
import { Rootstate } from '@/app/GlobalRedux/store'
import { InitialStateType, pizzaType, pricedDataType } from '@/app/interface'
import React from 'react'
import  { BsFillCartPlusFill } from "react-icons/bs"
import  { GrFavorite } from "react-icons/gr"
import {useSelector, useDispatch} from 'react-redux'
import { CartType } from '@/app/interface'
import Link from 'next/link'

function ProductComp({ id, image_url, title,price, pubisher
 } :  pricedDataType) {
    const cart = useSelector((state:Rootstate) => state.user.cart)
  const dispatch = useDispatch()

    // console.log(title)

  const addToCart = ( id: string, quantity:number = 1) => {
    dispatch(addCart({
      id,
      quantity,
      img:image_url,
      price,
      title
    }))
  }

    
  return (
        <article className="flex flex-col sm:h-[250px] md:h-[250px] rounded-md md:w-[9.5rem] m-[10px]  relative sm:w-[44%] outline outline-2   outline-orange-200 ">
            <span className='bg-orange-100 w-[30px] h-[30px] flex items-center justify-center rounded-full absolute right-2 top-2 cursor-pointer'>
              <GrFavorite/>  
            </span>
            <img src={image_url} alt={title} className='object-cover w-full rounded-md h-[65%] ' />

            <Link href={`/Details/${id}`} >
            <div className="details flex text-sm justify-between p-1 flex-col">
                    <p className='font-bold text-orange-800 text-[12px]'>{title?.slice(0, 20)}...</p>

                    <small className='text-orange-700'>{pubisher}
                    runEat

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

export default ProductComp