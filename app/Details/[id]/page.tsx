"use client"

import { hideCartNotification, showCartNotification } from '@/app/GlobalRedux/slice/uiSlice';
// import QuantityComp from '@/app/components/ProductComponent/quantityComp';
import { addCart, setCheckOrder } from '@/app/GlobalRedux/slice/userSlice';
import { Rootstate } from '@/app/GlobalRedux/store';
import CartNotification from '@/app/components/Home-Components/CartNotification';
import { OrderType, pizzaRecipeType, pricedDataType } from '@/app/interface';
import { createNewOrder } from '@/app/utils';
import { useQuery } from '@tanstack/react-query';
import { set } from 'firebase/database';
import generateUniqueId from 'generate-unique-id';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

const dynamicParams = true

interface ProductPageProps {
  params: {
    id: string
  }
}
interface ingredientsType {
  quantity: number,
  unit: string,
  description: string;
  // index: number
}
interface productType {
    publisher: string;
    ingredients: ingredientsType[];
    source_url: string;
    title: string;
    servings: number;
    cooking_time: number;
    id: string
    price: number,
    quantity: number,
    image_url:string,
}


  
  
 function Page({params }:ProductPageProps  ){


  const [orderQuantity, setOrderQuantity] = useState<number>(1)
  const [orderSIze, setOrderSIze] = useState<string>("M")
  const dispatch = useDispatch()
  const cartNotification = useSelector((state: Rootstate) => state.ui.cartNotification)

   
  const {id} = params
  const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`

  
//========rdata fetching manager // 
  const { data, isLoading, isError, error}  = useQuery({
    queryKey: ['getProduct'],
    staleTime: Infinity,
    
    queryFn: async () => {
      const res = await fetch(url)
      let data = await res.json()
      
      if(!res.ok) throw new Error(res.statusText)
      const pricedData = {
        ...data.data.recipe,
        price: Math.floor(Math.random() * 12) + 1,
           quantity: 1,

      }
      return pricedData as productType
    }
  })

  // ======================

 
  
 useEffect(() => {
  if(cartNotification){
    setTimeout(()=>{
    dispatch(hideCartNotification())
    },3000)
  }   
 }, [cartNotification])
 

 const description = data?.ingredients.map((ing) => ing.description).join(", ")

  if(data){
      return (
    <div className='flex md:w-full md:flex-col sm:flex-col p-2 relative'>
      {
            cartNotification && <CartNotification/>

      }
      <header className='w-full flex justify-between  items-center my-2'>
        <Link href={"../"} className='md:text-xl  sm:text-3xl md:my-1 '>
          <BiArrowBack/>
        </Link>
        <h2 className='text-xl font-bold'>
          Product Details
        </h2>



        <h2 className='text-xl italic font-semibold mx-3'>
          <span className='text-black'>run</span><span className='text-orange-400'>Eat</span> 
        </h2>

        
      </header>

      <section className='flex md:flex-row sm:flex-col md:mt-5'>
      <div className="img-title flex flex-col md:w-[50%] sm:w-[100%]">

      <img src={data.image_url} alt={data.title}  className=' md:w-full h-[30rem] rounded-md object-cover '/>

      </div>


{/* product decription */}

      <div className="description-buy flex-col flex md:m-4 md:w-[50%] sm:w-[100%] ">
      <h2 className='md:m-4 sm:my-3 sm:m-2 font-bold'>{data.title}</h2>


      <p className='m-2'><b> Price:</b> ${data.price}</p>
          <p className='m-2 '>
          <span className='font-bold'>Ingredients: </span>
          <small>

          {description}
          </small>

          </p>



      <div className="flex m-2">
        <span>Review: &nbsp; </span>
    <span className='text-yellow-500 flex'>
      <AiFillStar/>
      <AiFillStar/>
      <AiFillStar/>
      <AiFillStar/>
    </span>
      </div>
<div className="w-full flex items-center mx-2 my-1">
  Quantiy:
  <input type="number" min={1}  value={orderQuantity} onChange={(e)=> setOrderQuantity(+e.target.value)} className='p-1 w-[100px] border-2  border-orange-200 mx-1'/>


</div>

<div className="w-full flex items-center mx-2 my-1">
  size:
  <select className="border-2 w-[100px] text-xs p-1 mx-1" onChange={(e)=> {
    setOrderSIze(e.target.value) 
  }} >
        
        <option className='text-sm' >Select Size</option>
        <option className='text-sm' value={'SM'}>SM</option>
        <option className='text-sm' value={'M'}>M</option>
        <option className='text-sm' value={'L'}>L</option>
        <option className='text-sm' value={'XL'}>Xl</option>
    </select>

</div>
    



      <div className="add-buy flex w-full md:items-start md:my-4 sm:mb-20 sm:items-center sm:w-[100%] sm:justify-between md:justify-start
       sm:my-3">
        <button className='bg-orange-300 px-6 p-2 mx-3 rounded-full  text-center text-sm' 
        onClick={()=>{
          dispatch(addCart({
            id: generateUniqueId({
              length: 9,
              useLetters: true,
              useNumbers: true,
            }),
            orderQuantity,
            img:data?.image_url,
            price: data?.price,
            title: data?.title,
            size: orderSIze,
          }))
          dispatch(showCartNotification())
        }}
        
        >Add to Cart</button>
        <button className='bg-emerald-500 px-6 p-2 mx-3 rounded-full  text-sm'  
        onClick={()=>{


          
      const newOrder:OrderType = createNewOrder([{
        id: generateUniqueId({
          length: 9,
          useLetters: true,
          useNumbers: true,
        }),
        quantity: orderQuantity,
        img:data.image_url,
        price: data.price,
        title: data.title,
        size: orderSIze,
      }])

    

      dispatch(setCheckOrder(newOrder))
        window.location.href = '/Checkout'



        }}
        >Buy Now</button>
      </div>
        </div>

      </section>







     

    </div>
  )
  } 

  if(isLoading){
      return (
        <div className="w-full h-screen flex">

          <article className='m-auto text-xl'>
            ...Loading
          </article>

        </div>
      )

  } 

  if(isError){
    return(
      <div className="w-full h-screen flex">

      <article className='m-auto text-xl'>
        {
          error.message
        }: Please reload page
      </article>

    </div>
    )
  }



 

//   return (
//     <div className='flex md:w-full md:flex-col sm:flex-col p-2'>
//       <header className='w-full flex justify-between  items-center my-2'>
//         <Link href={"../"} className='md:text-xl  sm:text-3xl md:my-1 '>
//           <BiArrowBack/>
//         </Link>
//         <h2 className='text-xl font-bold'>
//           Product Details
//         </h2>



//         <h2 className='text-xl italic font-semibold mx-3'>
//           <span className='text-black'>run</span><span className='text-orange-400'>Eat</span> 
//         </h2>

        
//       </header>

//       <section className='flex md:flex-row sm:flex-col md:mt-5'>
//       <div className="img-title flex flex-col md:w-[50%] sm:w-[100%]">

//       <img src={image_url} alt={title}  className=' md:w-full h-[30rem] rounded-md object-cover '/>

//       </div>


// {/* product decription */}

//       <div className="description-buy flex-col flex md:m-4 md:w-[50%] sm:w-[100%] ">
//       <h2 className='md:m-4 sm:my-3 sm:m-2 font-bold'>{title}</h2>


//       <p className='m-2'><b> Price:</b> ${price}</p>
//           <p className='m-2 '>
//           <span className='font-bold'>Ingredients: </span>
//           <small>

//           {description}
//           </small>

//           </p>



//       <div className="flex m-2">
//         <span>Review: &nbsp; </span>
//     <span className='text-yellow-500 flex'>
//       <AiFillStar/>
//       <AiFillStar/>
//       <AiFillStar/>
//       <AiFillStar/>
//     </span>
//       </div>


//       <div className="add-buy flex w-full md:items-start md:my-4 sm:mb-20 sm:items-center sm:w-[100%] sm:justify-between md:justify-start
//        sm:my-3">
//         <button className='bg-orange-300 px-6 p-2 mx-3 rounded-full  text-center text-sm'>Add to Cart</button>
//         <button className='bg-emerald-500 px-6 p-2 mx-3 rounded-full  text-sm'>Buy Now</button>
//       </div>
//         </div>

//       </section>







     

//     </div>
//   )
}

 

export default Page