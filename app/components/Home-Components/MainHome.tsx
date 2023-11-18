"use client"
import React, {useEffect, useState} from 'react'
import SearchInput from './SearchInput'
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import Intro from './Intro';
import { Cartprops } from '@/app/interface';
import Banner from './Banner';
import PizzaList from './PizzaList';
import Tab from './Tab';
import {useSelector, useDispatch} from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store';
import BurgersList from './BurgersList';
import DesertList from './AllList';
import { hideCartNotification, showDesert } from '@/app/GlobalRedux/slice/uiSlice';
import CartNotification from './CartNotification';



function MainHome({showCart, setShowCart}: Cartprops) {
  const dispatch = useDispatch()
    const [search, setSearch] = useState<string>('')
    const pizza = useSelector((state: Rootstate) => state.ui.pizza)
    const burger = useSelector((state: Rootstate) => state.ui.burger)
    const desert = useSelector((state: Rootstate) => state.ui.desert)
    const cartNotification = useSelector((state: Rootstate) => state.ui.cartNotification)



    // useEffect(()=>{

    //     setTimeout(()=> {
    //       dispatch(hideCartNotification())
    //     }, 3000)
    //     console.log('tt')

    // },[cartNotification])

    

  return (
    <div className={`md:w-[70%] ${showCart ? 'sm:hidden md:flex' : 'md:flex sm:flex'} sm:w-[100%]  flex-col h-full md:p-2 sm:p-1 `}>


        <Intro/>

<form className="search flex items-center">
<SearchInput search={search} setSearch={setSearch}/>
    <button className='text-xl mx-2 p-2 md:px-6 sm:px-3  bg-slate-100 hover:bg-slate-300 rounded-md'>
    <AiOutlineSearch/>
    </button>

    <span className={` bg-orange-300 p-2 md:p6-4  sm:px-3 text-2xl mx-1 rounded-md hover:bg-orange-100 cursor-pointer md:hidden`} onClick={()=>setShowCart(true)}>
    <AiOutlineShoppingCart/>
    </span>
</form>
{/* <Banner/> */}
    <Tab/>

{
pizza && <PizzaList/> || burger && <BurgersList/> || desert && <DesertList/> 
}

    </div>
  )
}

export default MainHome