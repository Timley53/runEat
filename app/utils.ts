import generateUniqueId from "generate-unique-id"
import { CartType, OrderType } from "./interface"

interface dateObj {
    time: string,
    date: string
}

type dateConstruct = () => dateObj
type createNewOrderFxnType = (cart: CartType[]) => OrderType


export const constructDate: dateConstruct = () =>{
    return {
        time: new Date().toTimeString().split(' ')[0],
        date: new Date().toDateString().split(" ").slice(1).join("-")
    }
      }

    //   constructDate().


export const createNewOrder: createNewOrderFxnType = (cart: CartType[]) => {

    return {
            id: generateUniqueId({
              length: 9,
              useLetters: true,
              useNumbers: true,
            }),
            OverallPrice: cart?.reduce((acc, curr) =>{
              return acc + (curr.price * curr.quantity)
            }, 0) 
         ,
            time: constructDate(),
            pending: true,
            completed: false,
            canceled: false,
            orderedBy: '',
            orders: [...cart],
            address: '',
      
          
    }

}