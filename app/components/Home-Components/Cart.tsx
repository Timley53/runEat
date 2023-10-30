import { Cartprops } from '@/app/interface'
import React from 'react'
import CartComp from '../CartComp/CartComp'
import { useSelector } from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { MdCancel } from 'react-icons/md'

function Cart({showCart, setShowCart}: Cartprops) {
  const cart =  useSelector((state: Rootstate) => state.user.cart)

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <div className={`bg-slate-100 md:h-screen md:w-[30%] sm:w-[100%] sm:h-[100%]  md:sticky md:top-0 flex-col items-center  md:right-0 ${showCart ? 'sm:flex md:flex' : 'sm:hidden md:flex'} py-2 `}>

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
    <span className='text-sm'>${formatNumber( cart.reduce((acc, curr) =>{
      return acc + (curr.price * curr.quantity)
    }, 0))}</span>
  </div>

  <div className="w-full flex justify-between text-sm p-3 py-0">
    <span>Delivery fee</span>
    <span>${cart?.length * 2}</span>
  </div>

  <div className="total flex justify-between text-sm p-3 border border-r-0 border-l-0 my-1">
    <span>Total</span>
    <span>${cart?.reduce((acc, curr) =>{
      return acc + (curr.price * curr.quantity)
    }, 0) + (cart?.length * 2) }</span>
  </div>

<button className='bg-orange-500 text-white hover:bg-orange-400 mx-auto my-4 p-2 w-[80%]'>Checkout</button>
    </div>


        
        
    </div>
  )
}

export default Cart