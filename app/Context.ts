import { Context, createContext } from "react";
import { OrderModalType } from "./interface";

const contextDefault: any = null

export const AppContext = createContext({contextDefault})
export const OrderContext = createContext<OrderModalType>({
      modal: false,
      setModal:  () => {},
      setOrderDetails: () => {},
      orderDetails: null,
})