import React from 'react'
import { useSelector } from 'react-redux'
import { Rootstate } from '../GlobalRedux/store'

function Checkout() {
    const cartOrder = useSelector((state: Rootstate)=> state.user.cart)
  return (
    <div className="w-full overflow-y-scroll">


        
    </div>
  )
}

export default Checkout