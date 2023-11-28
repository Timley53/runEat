import { Rootstate } from '@/app/GlobalRedux/store';
import { favoriteType, pizzaRecipeType, pricedDataType } from '@/app/interface';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ProductComp from './ProductCOmp';
import Pagination from '../Pagination';
import { Hypnosis } from 'react-cssfx-loading';

interface SearchListType{
    search: string;
  
}

 function SearchList({search}: SearchListType) {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const favorites = useSelector((state:Rootstate) => state.user.favorite) 

    const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}&key=fa662663-12c3-4173-b9ef-0604c3ce8767`;


    const { data, isLoading, isError, error, refetch}  =  useQuery({
      queryKey: ['searchList'],
      staleTime:0 ,
      
      queryFn: async () => {
        const res = await fetch(url)
        let data = await res.json()
  
        if(!res.ok) throw new Error(res.statusText)
  
        // console.log(data.data.recipes)
  
        const pricedData = data.data.recipes.map((data: pizzaRecipeType) => {
          return {
            ...data, price: Math.floor(Math.random() * 12) + 1,
            quantity: 1,
          }
        })
        // console.log(pricedData)
  
        return pricedData as pricedDataType[]
      }
    })

    useEffect(() => {
        refetch()
    }, [search])
    


    
    const dataPerPage = 8;
    const pages = Math.ceil(data ? data.length/ dataPerPage : 0 )
  
    const start = (currentPage - 1) * dataPerPage
    const end = currentPage * dataPerPage
  
    if(isLoading) return (<div className='flex w-[300px] m-auto h-[300px] justify-center item-center  my-10'>
  
      <h2 className=" my-4">Searching for {search}..</h2>
       </div>)
  
    if(isError) return <div className="flex w-full h-full justify-center item-center">{error.message}</div>
  
    return (
      <div className='w-full h-full flex flex-col'>
        <h2>Search results for {search}</h2>


{
   data && data?.length < 1 && <div className='w-full h-full flex items-center justify-center  mt-11'>

    <h2>No results found</h2>

   </div> 
}

     { data && data.length > 0 && <div className='w-full flex flex-wrap sm:justify-start md:justify-start md:items-start  h-[full] my-2 '>
        {data?.slice?.(start, end).map((pizz: pricedDataType) => {
  
          const favorite =  favorites.some((fav:favoriteType) => fav?.id === pizz.id)
  
          return <ProductComp key={pizz.id} {...pizz} favorite={favorite} />
        })}
      </div>}
  <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>
  
        </div>
    )
}

export default SearchList