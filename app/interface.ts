import React from "react";


export interface AppContextType {
    expand: string;
    // setExpand:
}

export interface Cartprops{
    showCart: boolean;
    setShowCart:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InitialStateType {
    cart: CartType[] | [];
    productQuantity: number,
    favorite: favoriteType[] | [],
    checkoutList: CartType[] | []
    Orders:OrderType[],
    loading: boolean,
    error: boolean,
    errorMessage: string | unknown,
    name: string | null | undefined;
    authorized: boolean;
}

export interface favoriteType {
    title: string,
    img: string,
    price: number,
    id: string,

}

export interface CartType {
    id: string,
    quantity: number;
    img:string,
    price: number,
    title: string;
    size: string;
}
export interface newCartType {
    id: string,
    quantity: number,
    img:string,
    price: number,
    title:string

}
export interface uiInitialState {
    pizza: boolean;
    burger: boolean;
    desert: boolean;
    pending: boolean;
    completed: boolean;
    canceled: boolean;
    modal: boolean;
    modalDetails: object;
    cartNotification: boolean;
}

export interface pizzaType {
    description: string;
    id: number,
    img: string,
    name: string,
    price: number,
    quantity: 1,
    veg: boolean,
    sizeandcrust?: any
}

export interface pizzaRecipeType {
    id: string,
    image_url: string,
    pubisher: string,
    title: string
}

export interface pricedDataType {
    id: string,
    image_url: string,
    publisher: string,
    title: string,
    price: number,
    quantity: number,
    favorite: boolean
}

export interface SingleOrderType{
    productId: string,
    quantity: number,
    title: string,
    price: number,
    size: string;


}

export interface OrderType {
    id: string,
    orderedBy: string,
    orders: CartType[];
    OverallPrice: number;
    time: string;
    pending: boolean,
    completed: boolean,
    canceled: boolean,
}

export interface OrderModalType {
    orderDetails?: OrderType  | null;
    setOrderDetails: React.Dispatch<React.SetStateAction<OrderType | null>>;
    modal: boolean ;
    setModal:React.Dispatch<React.SetStateAction<boolean>> 
  
  }