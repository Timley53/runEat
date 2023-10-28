"use client"
import Image from 'next/image'
import MainHome from './components/Home-Components/MainHome'
import Cart from './components/Home-Components/Cart'
import {useState} from 'react' 

export default function Home() {
  const [showCart, setShowCart] = useState<boolean>(false)
  
  return (
    <main className="flex h-full">

<MainHome showCart={showCart} setShowCart={setShowCart}/>
<Cart showCart={showCart} setShowCart={setShowCart}/>
    </main>
  )
}
