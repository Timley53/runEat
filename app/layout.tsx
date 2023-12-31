
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav'
import { AppContext } from './Context'
import Dashbaord from './components/Dashbaord'


const inter = Inter({ subsets: ['latin'] }) 

export const metadata: Metadata = {
  title: 'runEat',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    
    <html lang="en">
      <body className={inter.className}>

        <Dashbaord>
        {children}
        </Dashbaord>

       

        

        </body>
    </html>
  ) 
}
