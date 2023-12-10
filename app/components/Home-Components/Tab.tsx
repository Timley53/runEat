import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store'
import { showDesert, showBuger, showPizza } from '@/app/GlobalRedux/slice/uiSlice'

interface props{
  setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>
  isSearch: boolean;
}

function Tab({setIsSearch, isSearch}: props ) {
    const pizza = useSelector((state: Rootstate) => state.ui.pizza)
    const burger = useSelector((state: Rootstate) => state.ui.burger)
    const desert = useSelector((state: Rootstate) => state.ui.desert)
    const dispatch = useDispatch()
    
   

  return (
    <div className='flex w-full bg-slate-100 my-2 text-sm rounded-sm '>
        <button onClick={(e)=>{ dispatch(showPizza()) 
        setIsSearch(false)
        }} className={`p-1 px-3  sm:w-1/3 md:w-[33%] ${pizza && !isSearch ? 'border-b-4 border-orange-400 text-orange-400 transition-all' : ''}`}>Pizza</button>

        <button onClick={(e)=>{ dispatch(showBuger()) 
        setIsSearch(false)
        }} className={`p-1 px-3 mx-3  sm:w-1/3 md:w-[33%] ${burger && !isSearch ? 'border-b-4 border-orange-400 text-orange-400 transition-all duration-[]' : ''}`}>Burger </button>

        <button onClick={(e)=>{ dispatch(showDesert())
        setIsSearch(false)
        }} className={`p-1 px-3 mx-3  sm:w-1/3 md:w-[33%] ${desert && !isSearch ? 'border-b-4 border-orange-400 text-orange-400 transition-all duration-[]' : ''}`}>Dessert</button>
    </div>
  )
}

export default Tab