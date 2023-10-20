"use client"

import React, {useState} from 'react'
import Nav from './Nav'


function Dashbaord({children } : React.PropsWithChildren) {
    const [expand, setExpand] = useState<boolean>(false)
  return (
    <div className={`w-full flex sm:h-[80%] md:h-[100%] sm:flex-col-reverse md:flex-row ` }>
        <Nav expand={expand} setExpand={setExpand}/>


        <main className={`${expand ? 'md:w-[85%] ' : 'md:w-full'} sm:sticky md:static  sm:w-[100%] sm:h-full md:h-full  border-2 border-green-600 `}>
        {children}
        </main>
        </div>
  )
}

export default Dashbaord