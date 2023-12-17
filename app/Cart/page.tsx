"use client"

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate, } from '../GlobalRedux/store'
import Pagination from '../components/Pagination'
import { CartType, OrderType } from '../interface'
import CartComp from '../components/CartComp/CartComp'
import { addOrder, clearCart, getState, listenOnAuth, setAuthorize, setCheckOrder, singInG } from '../GlobalRedux/slice/userSlice'
import GoogleButton from 'react-google-button'
import CartPageComp from './CartPageComp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../resource/firebase'
import generateUniqueId from 'generate-unique-id'
import { AiOutlineClear } from 'react-icons/ai'
import Link from 'next/link'
import { Unsubscribe } from '@reduxjs/toolkit'
import CartNotification from '../components/Home-Components/CartNotification'
import { constructDate, createNewOrder } from '../utils'



function Carts() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const cart = useSelector((state: Rootstate) => state.user.cart)
    const authorize = useSelector((state: Rootstate) => state.user.authorized)
  const userGlobal = useSelector((state: Rootstate) => state.user )


    const dispatch = useDispatch()

    const dataPerPage = 8;
    const pages = Math.ceil(cart ? cart.length/ dataPerPage : 0 )
  
    const start = (currentPage - 1) * dataPerPage
    const end = currentPage * dataPerPage


    useEffect(() => {
      dispatch(getState())
    }, [])

  
  // const router = useRouter()
    
  const total = cart?.reduce((acc, curr) =>{
    return acc + (curr.price * curr.quantity)
  }, 0) 
  
 
  
  
    const checkOutOrder = () => {
  
    
    
    if(cart.length < 1) return

  
     
      const newOrder:OrderType = createNewOrder(cart)

    

      dispatch(setCheckOrder(newOrder))
        window.location.href = '/Checkout'


  
    }

    
  

  
 



 
    
  

        return (
            <div className="w-[100%] h-[100%]   flex flex-col p-2 items-center sm:mb-10">


            <span className="mx-auto text-xl">Carts</span>

<div className="flex w-full p-1 items-center justify-between ">
    <article className='text-base'>
        <small>Price:</small>${total}
    </article>

 <div className="w-[60%] flex px-2  items-end justify-end">

<button className={`${cart.length < 1 ? "hidden" : ''} bg-orange-500 text-white hover:bg-orange-400 mx-3 self-center  my-4 p-2 w-[9rem] text-center  rounded-sm`} onClick={()=>checkOutOrder()}>Checkout</button>

{/* href={"/Checkout"} */}


<button className={` ${cart.length < 1 ? "hidden" : ''} p-2 px-2 mx-1 bg-rose-500 self-center rounded-sm   hover:bg-rose-400 text-white md:w-[7.5rem] flex items-center cursor-pointer`} onClick={()=>{
  dispatch(clearCart())}}> <span className='sm:hidden md:flex text-sm mx-2 '>Clear cart</span>
  <AiOutlineClear/>
</button>

    </div>

</div>


            <div className="md:w-[90%] sm:w-[100%] flex flex-wrap sm:justify-start self-center md:justify-center items-center  h-[full] my-2 ">
            {
                cart.length > 0 && cart.slice(start, end).map((cart : CartType) => {
    
                    return( <CartPageComp key={cart.id} {...cart} />)
                }) || cart.length < 1 && <div className="w-full h-full text-center ">
                    <h1>No carts added</h1>
                </div>
            }
            </div>
            <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>
    
            </div>
          )
   

}

export default Carts 