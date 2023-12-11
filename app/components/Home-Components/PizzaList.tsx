import React , {useState}from 'react'
import ProductComp from './ProductCOmp'
import { useQuery } from '@tanstack/react-query'
import { favoriteType, loadingArr, pizzaRecipeType, pizzaType, pricedDataType } from '@/app/interface';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';
import { Rootstate } from '@/app/GlobalRedux/store';
// import BarWave from "react-cssfx-loading/";
import {Hypnosis} from 'react-cssfx-loading'
import LoadingComp from './LoadingComp';

function PizzaList() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const favorites = useSelector((state:Rootstate) => state.user.favorite) 
 

  const url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=fa662663-12c3-4173-b9ef-0604c3ce8767';


  const { data, isLoading, isError, error}  = useQuery({
    queryKey: ['pizzaList'],
    staleTime: 0,
    
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


  const dataPerPage = 10;
  const pages = Math.ceil(data ? data.length/ dataPerPage : 0 )

  const start = (currentPage - 1) * dataPerPage
  const end = currentPage * dataPerPage

  if(isLoading) return (   <div className='w-full flex flex-wrap sm:justify-start md:justify-start   md:items-start  h-[full] my-2 '>
  {loadingArr.map((pizz) => {
    return (<LoadingComp key={pizz}/>)
  })}
</div>)

  if(isError) return <div className="flex w-full h-full justify-center item-center">{error.message}</div>

  return (
    <div className='w-full h-full flex flex-col '>
    <div className='w-full flex flex-wrap sm:justify-start md:justify-start sm:justify-center  md:items-start  h-[full] my-2 '>
      {data?.slice?.(start, end).map((pizz: pricedDataType) => {

        const favorite =  favorites.some((fav:favoriteType) => fav?.id === pizz.id)

        return <ProductComp key={pizz.id} {...pizz} favorite={favorite} />
      })}
    </div>
<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>

      </div>
  )
}

export default PizzaList

