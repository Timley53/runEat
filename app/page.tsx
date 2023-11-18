"use client"
import Image from 'next/image'
import MainHome from './components/Home-Components/MainHome'
import Cart from './components/Home-Components/Cart'
import {useState,  useEffect} from 'react' 
import { OrderType } from './interface'
import CheckoutModal from './components/Home-Components/CheckoutModal'
import { useDispatch, useSelector } from 'react-redux'
import { Rootstate } from './GlobalRedux/store'
import { hideCartNotification } from './GlobalRedux/slice/uiSlice'
import CartNotification from './components/Home-Components/CartNotification'

export default function Home() {
  const [showCart, setShowCart] = useState<boolean>(false)
  let [isOpen, setIsOpen] = useState(false)
  let [checkoutDetails, setCheckoutDetail] = useState<OrderType | null>(null)
  const dispatch = useDispatch()
  const cartNotification = useSelector((state: Rootstate) => state.ui.cartNotification)



  useEffect(()=>{

      setTimeout(()=> {
        dispatch(hideCartNotification())
      }, 3000)
      console.log('tt')

  },[cartNotification])

  
  
  return (
    <main className="flex h-full relative ">
            {cartNotification && <CartNotification/>}

      <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} checkoutDetails={checkoutDetails} setCheckoutDetail={setCheckoutDetail} />

<MainHome showCart={showCart} setShowCart={setShowCart}/>

<Cart showCart={showCart} setShowCart={setShowCart} isOpen={isOpen} setIsOpen={setIsOpen} checkoutDetails={checkoutDetails} setCheckoutDetail={setCheckoutDetail}/>
    </main>
  )
}
