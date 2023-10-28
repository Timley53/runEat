"use client"

import { CartType, InitialStateType,  } from "@/app/interface"
import { createSlice} from "@reduxjs/toolkit" 

const initialState: InitialStateType = {
    cart: [],
    productQuantity: 0,
}

const useSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addCart: (state, action) => {
            state.cart = [...state.cart,{...action.payload}]
        },
        removeCart: (state, action) => {
                state.cart = state.cart.filter(cart => cart.id !== action.payload)
        },
        increaseCartQuant: (state, action) => {
            state.cart = state.cart.map( cart => {
                if(cart.id === action.payload){
                     return{
                    ...cart, quantity: cart.quantity + 1
                }} else {
                    return cart
                }
            })
        },
        decreaseCartQuant: (state, action) => {
            state.cart = state.cart.map( (cart: CartType) => {
                if(cart.id === action.payload){
                     return{
                    ...cart, quantity: cart.quantity  - 1
                }} else {
                    return cart
                }
            })
        },
        deleteCart: (state, action) => {
            state.cart = state.cart.filter((cart: CartType) => cart.id !== action.payload)
        }

       
    }
})

export const {addCart, removeCart,increaseCartQuant, decreaseCartQuant, deleteCart } = useSlice.actions

export default useSlice.reducer