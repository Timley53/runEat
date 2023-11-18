"use client"
import { Rootstate } from '@/app/GlobalRedux/store'
import React from 'react'
import { MdOutlinePending, MdOutlineFreeCancellation } from 'react-icons/md'

import { BsBagCheckFill } from 'react-icons/bs'

import { FcCancel } from 'react-icons/fc'

import { useDispatch, useSelector } from 'react-redux'
import {showCanceled, showCompleted, showPending} from './../../GlobalRedux/slice/uiSlice'

function OrderTabs() {
    const pending = useSelector((state: Rootstate) => state.ui.pending)
    const completed = useSelector((state: Rootstate) => state.ui.completed)
    const canceled = useSelector((state: Rootstate) => state.ui.canceled)
    const dispatch = useDispatch()

  return (
    <div className='flex md:flex-col sm:flex-row w-full  md:w-[150px] md:items-start sm:w-[100%] bg-slate-300  rounded-lg md:px-2'>
        <button className={`m-2 bg-slate-200 w-[90%] rounded-md p-2 ${pending ? 'text-orange-400    md:border-orange-400 md:border-r-4': ''} text-sm flex items-center`} onClick={()=> dispatch(showPending())} > 

        <span  className="sm:hidden md:inline">Pending </span> 
        <span className="mx-2 text-xl sm:mx-auto"><MdOutlinePending/> 
        </span>
         </button>

        <button className={`m-2 bg-slate-200 w-[90%] rounded-md p-2  ${completed ? 'text-orange-400    md:border-orange-400 md:border-r-4': ''} text-sm flex items-center`} onClick={()=> dispatch(showCompleted())}>
          
           <span className="sm:hidden md:inline">Completed</span> <span className="mx-2 text-xl sm:mx-auto"> <BsBagCheckFill/></span> </button>

        <button className={`m-2 bg-slate-200 w-[90%] rounded-md p-2  ${canceled ? 'text-orange-400    md:border-orange-400 md:border-r-4': ''} text-sm flex items-center`} onClick={()=> dispatch(showCanceled())}> 
        <span className="sm:hidden md:inline">Canceled </span> 
         <span className="mx-2 text-xl sm:mx-auto"><MdOutlineFreeCancellation/> </span>
         </button>

        
    </div>
  )
}

export default OrderTabs