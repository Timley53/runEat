"use client"
import React, {useEffect, useState} from 'react'
import SearchInput from './SearchInput'
import {AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import Intro from './Intro';
import { Cartprops, pizzaRecipeType, pricedDataType } from '@/app/interface';
import Banner from './Banner';
import PizzaList from './PizzaList';
import Tab from './Tab';
import {useSelector, useDispatch} from 'react-redux'
import { Rootstate } from '@/app/GlobalRedux/store';
import BurgersList from './BurgersList';
import DesertList from './AllList';
import { hideCartNotification, showDesert } from '@/app/GlobalRedux/slice/uiSlice';
import CartNotification from './CartNotification';
import SearchList from './SearchList';
import SearchCloseBtn from './SearchCloseBtn';
import { useQuery } from '@tanstack/react-query';



function MainHome({showCart, setShowCart}: Cartprops) {
  const dispatch = useDispatch()
    const [search, setSearch] = useState<string>('')
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const pizza = useSelector((state: Rootstate) => state.ui.pizza)
    const burger = useSelector((state: Rootstate) => state.ui.burger)
    const desert = useSelector((state: Rootstate) => state.ui.desert)
    const cartNotification = useSelector((state: Rootstate) => state.ui.cartNotification)
    




    useEffect(() => {

      document.addEventListener('touchstart', function(e) {
        if (document.activeElement?.tagName !== 'INPUT') {
          document.body.style.overflow = 'hidden';
        }
      });
      
      document.addEventListener('touchend', function(e) {
        document.body.style.overflow = 'visible';
      });
      
    }, [])
    

  return (
    <div className={`md:w-[75%] ${showCart ? 'sm:hidden md:flex' : 'md:flex sm:flex'} sm:w-[100%]  flex-col h-full md:p-2 sm:p-1 items-center `}>


        <Intro/>

    <form className="search flex items-center sm:w-[97%] md:w-[95%] justify-center ">
        <SearchInput isSearch={isSearch} setIsSearch={setIsSearch} search={search} setSearch={setSearch}/>
            <SearchCloseBtn isSearch={isSearch} setIsSearch={setIsSearch}/>
   

    <span className={` bg-orange-300 p-2 md:p6-4  sm:px-3 text-2xl mx-1 rounded-md hover:bg-orange-100 cursor-pointer md:hidden`} onClick={()=>setShowCart(true)}>
    <AiOutlineShoppingCart/>
    </span>
</form>
{/* <Banner/> */}
    <Tab setIsSearch={setIsSearch} isSearch={isSearch}/>

{
!isSearch && (pizza && <PizzaList/> || burger && <BurgersList/> || desert && <DesertList/> ) || isSearch && <SearchList search={search}/>
}

    </div>
  )
}

export default MainHome