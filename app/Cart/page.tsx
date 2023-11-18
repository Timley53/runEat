"use client"

import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'
import Pagination from '../components/Pagination'
import { CartType } from '../interface'
import CartComp from '../components/CartComp/CartComp'
import { singInG } from '../GlobalRedux/slice/userSlice'
import GoogleButton from 'react-google-button'
import CartPageComp from './CartPageComp'

function Carts() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const cart = useSelector((state: Rootstate) => state.user.cart)
    const authorize = useSelector((state: Rootstate) => state.user.authorized)
    const dispatch = useDispatch()

    const dataPerPage = 8;
    const pages = Math.ceil(cart ? cart.length/ dataPerPage : 0 )
  
    const start = (currentPage - 1) * dataPerPage
    const end = currentPage * dataPerPage


    if(authorize){
        return (
            <div className="w-[100%] h-[100%]   flex flex-col p-2 items-center sm:mb-10">
            <span className="mx-auto text-xl">Carts</span>


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
            You are not signed in <GoogleButton className='md:mx-4 sm:my-5' onClick={()=> dispatch<any>(singInG())}>Sign in with Google</GoogleButton>
        </div>
    
          </div>
        )

    }

}

export default Carts 