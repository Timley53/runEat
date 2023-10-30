import React , {useState}from 'react'
import ProductComp from './ProductCOmp'
import { useQuery } from '@tanstack/react-query'
import { pizzaRecipeType, pizzaType, pricedDataType } from '@/app/interface';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';


function DesertList() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const favorites = useSelector((state:Rootstate) => state.user.favorite) 

 

  const url = 'https://forkify-api.herokuapp.com/api/v2/recipes?search=desserts&key=fa662663-12c3-4173-b9ef-0604c3ce8767';


  const { data, isLoading, isError, error}  = useQuery({
    queryKey: ['dessertList'],
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
      console.log(pricedData)

      return pricedData as pricedDataType[]
    }
  })


  const dataPerPage = 8;
  const pages = Math.ceil(data ? data.length/ dataPerPage : 0 )

  const start = (currentPage - 1) * dataPerPage
  const end = currentPage * dataPerPage

  if(isLoading) return (<div className='flex w-full h-full justify-center item-center'>Getting your delicious pizza </div>)

  if(isError) return <div className="flex w-full h-full justify-center item-center">{error.message}</div>

  return (
    <div className='w-full h-full flex flex-col'>
    <div className='w-full border-2 flex flex-wrap sm:justify-start md:justify-start md:items-start  h-[full] my-2 '>
      {data?.slice?.(start, end).map((pizz: pricedDataType) => {

         const favorite =  favorites.some((fav:favoriteType) => fav?.id === pizz.id)
        return <ProductComp key={pizz.id} {...pizz} favorite={favorite} />
      })}
    </div>
<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />

      </div>
  )
}

export default DesertList

