"use client"
import { Provider, useDispatch } from "react-redux";
import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import {  store } from "../GlobalRedux/store";
import TanstackProvider from "./TanstackProvider";
import { SessionProvider } from "next-auth/react";
import { getState } from "../GlobalRedux/slice/userSlice";




function Dashbaord({children } : {
  children: React.ReactNode
}) {
    const [expand, setExpand] = useState<boolean>(false)
 

  return (

    
    <SessionProvider>

    <TanstackProvider>
      <Provider store={store}>



    <div className={`w-full flex sm:h-[80%] md:h-[100%] sm:flex-col-reverse md:flex-row ` }>
        <Nav expand={expand} setExpand={setExpand}/>


        <main className={`${expand ? 'md:w-[full%] ' : 'md:w-full'} sm:sticky md:static  sm:w-[100%] sm:h-full md:h-full md:mb-1  sm:mb-[1rem] `} >
        {children}
        </main>
        </div>
      </Provider>
    </TanstackProvider>
    </SessionProvider>
  )
}

export default Dashbaord