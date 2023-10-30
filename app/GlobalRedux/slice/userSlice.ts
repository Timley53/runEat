"use client"

import { CartType, InitialStateType,  } from "@/app/interface"
import { createSlice} from "@reduxjs/toolkit" 

const initialState: InitialStateType = {
    cart: [],
    productQuantity: 0,
    favorite: []
}

const useSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addCart: (state, action) => {
            if(state.cart.some((car: CartType)=> car.id === action.payload.id)){
                state.cart = state.cart.map((car : CartType) => {
                    if(car.id === action.payload.id){
                        return {
                            ...car, quantity: car.quantity + 1
                        } 
                    } else {
                        return car
                    }
                })
            } else{
                state.cart = [...state.cart,{...action.payload}]
            }
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
                    ...cart, quantity: cart.quantity - 1
                }} else {
                    return cart
                }
            })

            state.cart = state.cart.filter((cart:CartType) => cart.quantity !== 0)
        },
        deleteCart: (state, action) => {
            state.cart = state.cart.filter((cart: CartType) => cart.id !== action.payload)
        },

        addFavorite: (state, action) => {
            state.favorite = [...state.favorite, {...action.payload}]
        }

       
    }
})

export const {addCart, removeCart,increaseCartQuant, decreaseCartQuant, deleteCart, addFavorite } = useSlice.actions

export default useSlice.reducer