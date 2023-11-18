import { OrderContext } from '@/app/Context'
import { closeModal, openModal } from '@/app/GlobalRedux/slice/uiSlice'
import { Rootstate } from '@/app/GlobalRedux/store'
import { OrderType } from '@/app/interface'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// const newOrder:OrderType = {
//   id: generateUniqueId({
//     length: 9,
//     useLetters: true,
//     useNumbers: true,
//   }),
//   OverallPrice: total ,
//   time: new Date(),
//   pending: true,
//   completed: false,
//   canceled: false,
//   orderedBy: '',
//   orders: [...cart],
// }

function PendingComp({id, OverallPrice,time, pending, canceled, completed, orderedBy, orders} : OrderType) {
  const dispatch = useDispatch()
  const {modal, setModal, orderDetails, setOrderDetails} = useContext(OrderContext)

  console.log(time);
  
  return (
    <article className='text-sm flex justify-between p-3 py-2 my-2 bg-white rounded-lg items-center'>
        <span className='text-xs text-center'>
    {id}
        </span>

        <span className='text-xs text-center sm:hidden md:inline'>
    {orderedBy}
        </span>

        <span className='text-xs text-center'>
{time}
        </span>

        <span className='text-xs text-center'>$
{OverallPrice}
        </span>

        <span className='text-xs text-center'>
<button className='p-2 px-3 rounded-full text-white bg-emerald-500 hover:bg-emerald-200' onClick={()=>{
  setOrderDetails({
    id, OverallPrice,time, pending, canceled, completed, orderedBy, orders
  })
  setModal(true)} }> View</button>
        </span>
        
    </article>
  )
}

export default PendingComp