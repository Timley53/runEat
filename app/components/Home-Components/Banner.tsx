import React from 'react'
import img from '../../resource/pexels-armin-rimoldi-5553620.jpg'
import img2 from '../../resource/pexels-narda-yescas-1566837.jpg'

function Banner() {
  return (
    <div className='banner-bg w-full h-[260px]  bg-orange-300 my-2 flex rounded-md relative'>

        <img src={`${img.src}`} className='h-[100%] object-cover w-[40%] rounded-md rounded-e-none' alt="" />
        
        <div className="text-center w-full ">
            <h1 className={`font-bold text-white`}>30% Off</h1>
            <h3><i>Delicious Meal </i></h3>
        </div>

        <div className='floating absolute w-[40%] bg-slate-600 z-30'/>

        {/* <img src={`${img2.src}`} className='h-[100%] object-fill w-[30%] rounded-md rounded-e-none' alt="" /> */}
    </div>
  )
}

export default Banner