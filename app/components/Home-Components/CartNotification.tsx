import React from 'react'
import { BiCartAdd } from 'react-icons/bi'

function CartNotification() {
  return (
    <article className="p-2 px-4 rounded-xl bg-slate-300  m-3 flex w-[140px] justify-between cartNot text-sm">
        Cart Added <BiCartAdd className="text-orange-600 text-xl" />
    </article>
  )
}

export default CartNotification