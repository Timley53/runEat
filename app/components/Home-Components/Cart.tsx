import { Cartprops } from '@/app/interface'
import React from 'react'
import CartComp from '../CartComp/CartComp'
import { useSelector } from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { MdCancel } from 'react-icons/md'

function Cart({showCart, setShowCart}: Cartprops) {
  const cart =  useSelector((state: Rootstate) => state.user.cart)

  return (
    <div className={`bg-slate-100 md:h-screen md:w-[30%] sm:w-[100%] sm:h-[100%]  md:sticky md:top-0 flex-col items-center  md:right-0 ${showCart ? 'sm:flex md:flex' : 'sm:hidden md:flex'} py-2`}>

    <div className="flex w-[100%]   items-center">
      <button   className='md:hidden inline self-start p-2 text-2xl text-rose-500' onClick={()=>setShowCart(!showCart)}><MdCancel/></button>

    <span className='mx-auto'>My Carts</span>
    </div>


    <div className="w-full h-[400px] overflow-y-scroll flex-col flex">

{
  cart?.map( car => <CartComp key={car.id} {...car}/> )
}
    </div>

        
        
    </div>
  )
}

export default Cart