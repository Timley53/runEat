"use client"

import React, {useState, useEffect} from 'react'
import OrderTabs from '../components/OrderComponents/OrderTabs'
import Pending from '../components/OrderComponents/Pending'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'
import { ImCross } from 'react-icons/im'
import { closeModal } from '../GlobalRedux/slice/uiSlice'
import { getState, setAuthorize, singInG } from '../GlobalRedux/slice/userSlice'
import OrderModal from '../components/OrderComponents/Modal'
import { OrderType } from '../interface'
import { OrderContext } from '../Context'
import Completed from '../components/OrderComponents/Completed'
import Canceledwrapper from '../components/OrderComponents/CanceledWrapper'
import Canceled from '../components/OrderComponents/Canceled'
import { signIn, useSession } from 'next-auth/react'
import GoogleButton from 'react-google-button'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../resource/firebase'
import AYS from '../components/AYS'


interface OrderContextObjType {
  modal: boolean, setModal: React.Dispatch<React.SetStateAction<boolean>>, orderDetails: OrderType | null, setOrderDetails: React.Dispatch<React.SetStateAction<OrderType | null>>;
}

function Orders() {
  // const modal = useSelector((state: Rootstate) => state.ui.modal)
  const confirmation = useSelector((state: Rootstate) => state.ui.confirmation)
  const modalDetails = useSelector((state: Rootstate) => state.ui.modalDetails)
  const pending = useSelector((state: Rootstate) => state.ui.pending)
  const canceled = useSelector((state: Rootstate) => state.ui.canceled)
  const completed = useSelector((state: Rootstate) => state.ui.completed)
  const authorized = useSelector((state: Rootstate)=> state.user.authorized)

  const userGlobal = useSelector((state: Rootstate) => state.user )

  const [modal, setModal] = useState<boolean>(false)
  const [orderDetails, setOrderDetails] = useState<OrderType | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
      
    // dispatch<any>(listenOnAuth())
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if(user){
       dispatch( setAuthorize(true))
      }else{
        dispatch( setAuthorize(false))

      }
    })

   return () => unsubscribe()
}, [])


    useEffect(() => {
      dispatch(getState())
    }, [])
    



  if(!authorized){
    return(
      <div className='w-full flex h-screen flex-col '>
        <h2 className='w-full text-center  p-3'>Orders</h2>

<div className="flex h-full w-full sm:flex-col md:flex-row justify-center  items-center ">
  <span>You are not logged in</span>   
  <GoogleButton className='md:mx-4 sm:my-5' onClick={()=> dispatch<any>(singInG())}>Sign in with Google</GoogleButton>
</div>

      </div>
    ) 
  }else{



  return (
    <OrderContext.Provider value={{modal, setModal, orderDetails, setOrderDetails}}>
    <div className='md:min-h-screen  h-full  flex items-center flex-col p-2 relative'>
      
      {/* {
        modal && <div className="h-screen  w-full bg-slate-300 bg-opacity-40  absolute left-0 top-0 backdrop-blur-md flex justify-center items-center z-50 transition-all duration-1000"> 

        <div className={` ${modal ? "modal" : ""} md:w-[60%] sm:w-[85%] sm:h-[80%]  md:max-w-md md:h-[400px] bg-white rounded-md flex flex-col transition-all duration-[2s] delay-[1s] `}>

          <button className='p-2 text-red-600 self-end m-2 text-base' onClick={() => dispatch(closeModal())}>
            <ImCross/>
          </button>

        </div>

        </div>
      } */}
        { confirmation &&  <AYS setModal={setModal}/>}

  {
    <OrderModal/>
  }
      <h2 className='text-orange-400 my-2 text-xl'>Orders</h2>

      <div className="w-full flex md:flex-row sm:flex-col ">

        <OrderTabs/>
    { pending && <Pending/> || completed && <Completed/>  || canceled && <Canceled/>  }  
      </div>
        
    </div>
    </OrderContext.Provider>

  )
}

}

export default Orders