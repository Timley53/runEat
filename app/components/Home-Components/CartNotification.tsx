import React from 'react'
import { BiCartAdd } from 'react-icons/bi'

function CartNotification() {
  return (
    <article className="p-2 px-6 rounded-xl fixed  bg-orange-500 bottom-2 z-10 m-3 flex">
        Cart Added <BiCartAdd/>
    </article>
  )
}

export default CartNotification