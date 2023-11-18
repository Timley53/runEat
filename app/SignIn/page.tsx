import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { singInG } from '../GlobalRedux/slice/userSlice'
import { Rootstate } from '../GlobalRedux/store'
import GoogleButton from 'react-google-button'

function Signin() {
    const dispatch = useDispatch()
    const authorized = useSelector((state: Rootstate)=> state.user.authorized)

    if(authorized){
        return(
            <div className='h-screen w-full flex items-center justify-center'>

                <article className='inline'>
                    You are signed in <button className='bg-orange-400 hover:bg-orange-200 transition-all rounded-md'>Go back</button>
                </article>
            </div>
        )
    }else{
        <div className='h-screen w-full flex items-center justify-center'>

        <article className='inline'>
            You are not signed in <GoogleButton onClick={()=> dispatch<any>(singInG())}>Sign in with Google</GoogleButton>
        </article>
    </div>
    }
    


 
}

export default Signin