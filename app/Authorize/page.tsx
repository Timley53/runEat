"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singInG } from '../GlobalRedux/slice/userSlice'
import { Rootstate } from '../GlobalRedux/store'
import GoogleButton from 'react-google-button'
import Link from 'next/link'


function Authorize() {
    const dispatch = useDispatch()
    const authorized = useSelector((state: Rootstate)=> state.user.authorized)

    if(authorized){
        return(
            <div className='h-screen w-full flex items-center justify-center '>

                <article className='inline'>
                    You are signed in <Link  href="/" className='bg-orange-400 hover:bg-orange-200 transition-all rounded-md p-3'>Go back</Link>
                </article>
            </div>
        )
    }else{
       return( <div className='h-screen w-full flex items-center justify-center '>
        <div className='flex sm:flex-col md:flex-row  items-center '>
            You are not signed in <GoogleButton className='md:mx-4 sm:my-5' onClick={()=> dispatch<any>(singInG())}>Sign in with Google</GoogleButton>
        </div>
    </div>
    )
    }
    

}

export default Authorize