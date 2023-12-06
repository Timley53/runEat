"use client"
import  react, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Rootstate } from "../GlobalRedux/store"
import { favoriteType } from "../interface"
import FavoriteComp from "./FavoriteComp"
import Pagination from "../components/Pagination"
import { getState, setAuthorize, setStateCookies, singInG } from "../GlobalRedux/slice/userSlice"
import GoogleButton from "react-google-button"
import { Unsubscribe, onAuthStateChanged } from "firebase/auth"
import { auth } from "../resource/firebase"



function Favorites(){
  const [currentPage, setCurrentPage] = useState<number>(1)
  const favorite = useSelector((state : Rootstate) => state.user.favorite)
  const authorized = useSelector((state: Rootstate)=>state.user.authorized )
  const userGlobal = useSelector((state: Rootstate) => state.user )

  // console.log(favorite)
  const dispatch = useDispatch()

  const dataPerPage = 8;
  const pages = Math.ceil(favorite ? favorite.length/ dataPerPage : 0 )

  const start = (currentPage - 1) * dataPerPage
  const end = currentPage * dataPerPage


//   useEffect(() => {
// setCurrentPage(1)  }, [userGlobal])

  useEffect(() => {
    dispatch(getState())
  }, [])


  
  useEffect(() => {
    let unsubscribe:Unsubscribe | any
    let x = document.cookie

    let splitCookieUnparsed = x.split(';')[1]
   
     


  }, [])
  

  


    

    return(
        <div className="w-[100%] h-[100%]   flex flex-col p-2 items-center sm:mb-10">
        <span className="mx-auto text-xl">Favorites</span>

       
        <div className="md:w-[90%] sm:w-[100%] flex flex-wrap sm:justify-start self-center md:justify-center items-center  h-[full] my-2 ">
        {
            favorite.length > 0 && favorite.slice(start, end).map((fav : favoriteType) => {

                return( <FavoriteComp key={fav.id} {...fav} />)
            }) || favorite.length < 1 && <div className="w-full h-full text-center ">
                <h1>No favorites added</h1>
            </div>
        }
        </div>
        <Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/>

        </div>
    )
  

}

export default Favorites