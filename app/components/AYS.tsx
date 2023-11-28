import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder } from '../GlobalRedux/slice/userSlice'
import { Rootstate } from '../GlobalRedux/store'
import { showConfirm } from '../GlobalRedux/slice/uiSlice'
cancelOrder

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function AYS({ setModal} : Props ) {
  const type = useSelector((state: Rootstate) => state.ui.confirmationType)
  const id = useSelector((state: Rootstate) => state.ui.confirmationTypeId)

    const dispatch = useDispatch()

  const handleConfirm = () => {

    if(type === 'cancel order'){
      dispatch(cancelOrder(id))
    }
  }

  return (
    <div className='fixed w-screen left-0 top-0 h-screen  bg-black bg-opacity-40  backdrop-blur-md flex items-center justify-center z-50'>

        <div className="sm:w-[80%] md:w-[40%] h-[230px] flex items-center flex-col bg-slate-100 p-3 rounded-md justify-center z-30">
            <h2 className="">Are you sure?</h2>

        <div className='flex w-full justify-around my-6'>
            <button className='p-2 px-4 rounded-md bg-rose-700' onClick={()=>{
             dispatch(showConfirm({
              id: '',
              type: '',
              modal: false
             }))
             setModal(false)
} }>No</button>
            
            <button className='p-2 px-4 rounded-md bg-green-700' onClick={()=> {
                dispatch(showConfirm({
                  id: '',
                  type: '',
                  modal: false
                 }))
              handleConfirm()
              
              }}>Yes</button>
        </div>
        </div>
        
    </div>
  )
}

export default AYS