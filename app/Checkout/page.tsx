"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'
import CheckArticle from './CheckArticle'
import { addOrder, clearCart, clearOrder, getState } from '../GlobalRedux/slice/userSlice'
import Pagination from '../components/Pagination'
import AddressInput from './AddressInput'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import { BsArrowLeft, BsArrowReturnLeft, BsArrowRight } from 'react-icons/bs'
import FormComponent from './FormComponent'
import { BiArrowBack, BiArrowToLeft } from 'react-icons/bi'


function Checkout() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [mobileCheck, setMobileCheck] = useState<boolean>(false)

  // form data states
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  
  // =============>>>
  
    const cartOrder = useSelector((state: Rootstate) => state.user.checkoutList)
  const userGlobal = useSelector((state: Rootstate) => state.user )

  const dataPerPage = 2;
  const pages = Math.ceil(cartOrder ? cartOrder.orders.length/ dataPerPage : 0 )

  const start = (currentPage - 1) * dataPerPage
  const end = currentPage * dataPerPage


    // console.log(cartOrder)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getState())
    }, [])

    const formSubmitAddress = (e: React.FormEvent, data:object)=> {
      e.preventDefault()
      

      console.log(data)

//       dispatch(addOrder({
//         ...cartOrder,
         
//       }))
// dispatch(clearCart())
// dispatch(clearOrder())
      // clearCart()
      

    }
    const shippingFee = cartOrder ? cartOrder?.orders?.length * 0.8: 0;
    const total = cartOrder ? cartOrder?.orders.reduce((acc, curr)=>{
      return acc + curr.price
    } ,0): 0;

  return (
    <div className="w-full md:h-screen sm:h-screen flex  items-center bg-[#D8D9DD] p-2 justify-center">



<div className={`md:w-[44%] md:max-w-[350px]  sm:w-[100%] md:h-[95%] ${mobileCheck ? "md:flex sm:hidden" : "md:flex sm:flex"} flex-col   mx-4 bg-[#FFFFFF] rounded-md`}>

  <h2 className='md:p-2 sm:p-1 border-b-2 w-[90%] mx-auto flex justify-between items-center'>
    Order cart

<article className=' sm:fkex md:hidden flex p-1'>
<Link href={"../"} onClick={()=> dispatch(clearOrder())} className='mr-6 p-2 text-xl'><RxCross2/>
</Link>


{
cartOrder && cartOrder?.orders?.length > 0 && <button className='p-2 text-xl' onClick={(e)=> setMobileCheck(true)}><BsArrowRight/></button>
}
</article>
    </h2>

  <div className="w-full flex flex-col items-center h-[80%]  ">

{
cartOrder && cartOrder?.orders.length < 1 && <div className="w-full">
  No Order
  </div> || cartOrder && cartOrder.orders.slice(start, end).map((order) => (
    <CheckArticle key={order.id} {...order}/>
  ))
}

<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>

</div>

<div className="w-full flex flex-col p-2">

  <div className="flex flex-col w-full border-t-2 border-b-2 p-2  text-sm">

  <article className='flex w-full justify-between my-1'>
    <span>Subtotal:</span>
    <span>${cartOrder?.orders.reduce((acc, curr)=>{
          return acc +  (curr.price * curr.quantity)
        } ,0)}</span>
  </article>

  <article className='flex w-full justify-between my-1'>
    <span>Delivery:</span>
    <span>${ cartOrder ? (cartOrder?.orders?.length * 0.8).toFixed(1): 0 }</span>
  </article>
  </div>

  <div className="flex w-full ">
  <article className="flex w-full justify-between p-2 text-sm">
    <span>Total</span>
    <span>${
       (cartOrder && (cartOrder?.orders.reduce((acc, curr)=>{
          return acc + (curr.price * curr.quantity)
        } ,0) || 0) + shippingFee)
}</span>
  </article>
  </div>
</div>


</div>

{/* buyers info */}

    <div  className={`md:w-[44%] md:max-w-[350px]  sm:w-[100%] md:h-[95%] pb-6 ${mobileCheck ? "md:flex sm:flex" : "md:flex sm:hidden"} flex-col p-1  mx-4 bg-[#FFFFFF] rounded-md`} >

    <h2 className='p-1 py-2 w-[95%] border-b-2 mx-auto text-sm flex justify-between'>Delivery Info 
    <button className='text-xl hover:text-red-200 transition-all' onClick={()=> setMobileCheck(false)}>
      <RxCross2/>
    </button>
    </h2>


 

    <FormComponent setMobileCheck={setMobileCheck} formSubmitAddress={formSubmitAddress}/>    


      {/* <article className='flex w-full justify-between p-1 my-1 items-center'>
        <Link href={"/"} onClick={()=> dispatch(clearOrder())} className='mt-3 p-1 py-2 px-4 rounded-md bg-rose-400 hover:bg-rose-200 text-center md:text-xs  sm:text-lg transition-all' >Cancel</Link>

        <button className='mt-3 p-2 px-4 rounded-md bg-green-500 hover:bg-emerald-200 text-center md:text-xs sm:text-lg  transition-all' 
        >Pay</button>
      </article> */}
      
    </div>



        
    </div>
  )
}

export default Checkout

