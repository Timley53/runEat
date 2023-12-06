"use client"
import React, {useState, useEffect} from 'react'
import {useSession } from 'next-auth/react'
import Link from 'next/link'
import { GrGoogle } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { singInG, listenOnAuth } from '@/app/GlobalRedux/slice/userSlice'
import { onAuthStateChanged } from 'firebase/auth/cordova'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/resource/firebase'
import { Rootstate } from '@/app/GlobalRedux/store'



function Intro() {
  // const {data : session} = useSession()
  const name = useSelector((state: Rootstate)=> state.user.name)
  const authorized = useSelector((state: Rootstate)=> state.user.authorized)
  // console.log(name)
  // console.log(authorized)
  
  // const [name, setName] = useState<string | null>('')
  const firstNameFxn = (name: string | null | undefined ) => {
    return name?.split(' ')?.[1]
  }
  const dispatch = useDispatch()



  
    return (

      authorized && <div className={`w-full p-3`}>
      <span><i>Welcome</i></span>,  &nbsp;
   <span className='text-2xl cursor-pointer'>  {name?.split(' ')?.[1]}</span>
  </div>

  || !authorized && <div className={`w-full p-3 flex items-center`}>
          <span><i>Welcome</i></span>
        

      </div> 
    )
    
}

export default Intro