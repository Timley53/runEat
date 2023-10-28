
// import QuantityComp from '@/app/components/ProductComponent/quantityComp';
import Link from 'next/link';
import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { FaBackward } from 'react-icons/fa';
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
}
interface productType {
    publisher: string;
    ingredients: ingredientsType[];
    source_url: string;
    title: string;
    servings: number;
    cooking_time: number;
    id: string
}

async function getRecipe(id: string){
  const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`, {
      next: {
          revalidate: 20
      }
  })

  if(!res.ok){
      // notFound()
  }

  return await res.json()
}

async function Page({params }:ProductPageProps  ) {
  // const productQuantity = useSelecor((state: Rootstate) => state.user.productQuantity)



  const {id} = params

  const data = await getRecipe(id)
  const {image_url,title,ingredients, } = await data.data.recipe
  const price: number = Math.floor(Math.random() * 20) + 1

  // console.log(data.data.recipe)
 const description = ingredients.map((ing:ingredientsType ) => ing.description).join(', ')

  return (
    <div className='flex  border-2 md:flex-row sm:flex-col md:p-2 sm:p-0 bg-slate-50 md:h-screen sm:h-full' >

      <div className="img-title flex flex-col md:w-[50%] sm:w-[100%]">
        <Link href={"../"} className='self-start md:text-xl sm:my-2 sm:text-3xl md:my-1 '>
          <BiArrowBack/>
        </Link>
      <h2 className='md:m-4 sm:my-3 sm:m-2 font-bold md:order-1 sm:order-2 '>{title}</h2>

      <img src={image_url} alt={title}  className=' md:w-full h-[30rem] rounded-md object-cover '/>

      </div>






        <div className="description-buy flex-col flex md:m-4 md:w-[50%] sm:w-[100%]   md:pt-20">

      <p className='m-2 md:mt-8'><b> Price:</b> ${price}</p>
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


      <div className="add-buy flex w-full md:items-start md:my-4 sm:mb-20 sm:items-center sm:w-[100%] sm:justify-between md:justify-start
       sm:my-3">
        <button className='bg-orange-300 px-6 p-2 mx-3 rounded-full text-base text-center'>Add to Cart</button>

        <button className='bg-emerald-500 px-6 p-2 mx-3 rounded-full text-base'>Buy Now</button>
      </div>
        </div>

    </div>
  )
}

export default Page