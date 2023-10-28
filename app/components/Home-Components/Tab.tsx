import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { showDesert, showBuger, showPizza } from '@/app/GlobalRedux/slice/uiSlice'


function Tab() {
    const pizza = useSelector((state: Rootstate) => state.ui.pizza)
    const burger = useSelector((state: Rootstate) => state.ui.burger)
    const desert = useSelector((state: Rootstate) => state.ui.desert)
    const dispatch = useDispatch()
    
   

  return (
    <div className='flex w-full bg-slate-100 my-2 text-sm rounded-sm '>
        <button onClick={(e)=> dispatch(showPizza()) } className={`p-1 px-3  sm:w-1/3 md:w-[33%] ${pizza ? 'border-b-4 border-orange-400 text-orange-400' : ''}`}>Pizza</button>

        <button onClick={(e)=> dispatch(showBuger())} className={`p-1 px-3 mx-3  sm:w-1/3 md:w-[33%] ${burger ? 'border-b-4 border-orange-400 text-orange-400' : ''}`}>Burger </button>

        <button onClick={(e)=> dispatch(showDesert())} className={`p-1 px-3 mx-3  sm:w-1/3 md:w-[33%] ${desert ? 'border-b-4 border-orange-400 text-orange-400' : ''}`}>Dessert</button>
    </div>
  )
}

export default Tab