"use client"

import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate, } from '../GlobalRedux/store'
import Pagination from '../components/Pagination'
import { CartType, OrderType } from '../interface'
import CartComp from '../components/CartComp/CartComp'
import { addOrder, clearCart, getState, listenOnAuth, setAuthorize, singInG } from '../GlobalRedux/slice/userSlice'
import GoogleButton from 'react-google-button'
import CartPageComp from './CartPageComp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../resource/firebase'
import generateUniqueId from 'generate-unique-id'
import { createDate } from '../components/Home-Components/Cart'
import { AiOutlineClear } from 'react-icons/ai'
import Link from 'next/link'
import { Unsubscribe } from '@reduxjs/toolkit'



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
  
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('en-US').format(num)
    }
  
  
    const checkOutOrder = () => {
  
      onAuthStateChanged(auth, (user)=>{
        if(user){
          window.location.href = '/Orders'  
        }else{
           dispatch<void | any>(singInG())
  
          }
      })
  
  
     
      const newOrder:OrderType = {
        id: generateUniqueId({
          length: 9,
          useLetters: true,
          useNumbers: true,
        }),
        OverallPrice: total ,
        time: createDate(),
        pending: true,
        completed: false,
        canceled: false,
        orderedBy: '',
        orders: [...cart],
        address: ''
      }
      dispatch(addOrder(newOrder));
    //   setCheckoutDetail(newOrder)
  
    //   setIsOpen(true)
    }

/*

    if(!authorize){
      let x = document.cookie
      
      let splitCookieUnparsed = x.split(';')[1]
      dispatch(setAuthorize(splitCookieUnparsed))
      // console.log(split)
      // const cookie = JSON.parse( `{"authorize": true}`)
      // console.log(cookie)

    }
*/


    useEffect(() => {
      let unsubscribe:Unsubscribe | any
      let x = document.cookie

      let splitCookieUnparsed = x.split(';')[1]
      // dispatch(setAuthorize(splitCookieUnparsed))
        // dispatch<any>(listenOnAuth())

        if(!authorize && !splitCookieUnparsed){
           unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(user){
             dispatch( setAuthorize(true))
        // document.cookie = `{"authorize": true}`

  
      } else{
        dispatch( setAuthorize(false))
        
      }
    })
    return () => unsubscribe()

        }else if(!authorize && splitCookieUnparsed){
          unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(user){
            //  dispatch( setAuthorize(true))
        // document.cookie = `{"authorize": true}`
              dispatch(setAuthorize(splitCookieUnparsed))


  
            } else{
              dispatch( setAuthorize(false))
  
            }
          })
          
          return () => unsubscribe()
        }


    }, [])
    
  

    if(authorize){
        return (
            <div className="w-[100%] h-[100%]   flex flex-col p-2 items-center sm:mb-10">
            <span className="mx-auto text-xl">Carts</span>

<div className="flex w-full p-1 items-center justify-between ">
    <article className='text-base'>
        <small>Price:</small>${total}
    </article>

 <div className="w-[60%] flex px-2  items-end justify-end">

<Link href={"/Checkout"} className={`${cart.length < 1 ? "hidden" : ''} bg-orange-500 text-white hover:bg-orange-400 mx-3 self-center  my-4 p-2 w-[9rem] text-center  rounded-sm`} onClick={()=>checkOutOrder()}>Checkout</Link>


<button className={` ${cart.length < 1 ? "hidden" : ''} p-2 px-2 mx-1 bg-rose-500 self-center rounded-sm   hover:bg-rose-400 text-white md:w-[7.5rem] flex items-center cursor-pointer`} onClick={()=>{
  // document.cookie = `{"authorize": true}`


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
    }else{
        return (
            <div className='w-full flex h-screen flex-col '>
            <h2 className='w-full text-center  p-3'>Cart</h2>
    
      <div className='flex h-full w-full sm:flex-col md:flex-row justify-center  items-center '>
            You are not signed in <button className='md:mx-4 sm:my-5' onClick={()=> dispatch<any>(singInG())}>Sign in with Google</button>
        </div>
    
          </div>
        )

    }

}

export default Carts 