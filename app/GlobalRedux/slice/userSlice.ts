"use client"

import { CartType, InitialStateType, favoriteType,  } from "@/app/interface"
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit" 
import { signInWithPopup } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth/cordova"
import { auth, provider } from "../../resource/firebase"


const initialState: InitialStateType = {
    cart: [],
    productQuantity: 0,
    favorite: [],
    Orders: [],
    checkoutList: [], 
    name: '',
    authorized: false,
// state-loading
    loading: false,
    error: false,
    errorMessage: ''
}

   export  const singInG = createAsyncThunk('user/singInG', async ()=>{
try{
    const result = await signInWithPopup(auth, provider)
    console.log(result)

    return result.user.displayName

}catch(err){
    throw new Error("Error signing in")
}
   })


export const listenOnAuth = createAsyncThunk('user/listenOnAuth', async ()=>{
try{
    let nme
    const subscribe = onAuthStateChanged(auth, (user)=> {
        if(user){
            nme = user.displayName
        } else{
            nme = false
        }


    })
    console.log(subscribe)

    return nme

}catch(err){
    throw new Error('')
}
   })


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
            if(state.favorite.some((fav: favoriteType)=> fav.id === action.payload.id)){
                return
            }
            state.favorite = [...state.favorite, {...action.payload}]
        },
        removeFav: (state, action) => {
            // console.log(action.payload)
            state.favorite = state.favorite.filter((fav: favoriteType) => fav.id !== action.payload.id)
        },
        changeSize: (state, action) => {
            state.cart = state.cart.map((cartIndex: CartType) => {
                
                if(action.payload.id === cartIndex.id){
                    return {
                        ...cartIndex, size: action.payload.size
                    } 
                }else {
                    return cartIndex
                } 
            })
        },

        addOrder: (state, action) => {
            state.Orders = [...state.Orders, action.payload]
        },
        clearCart: (state) => {
            state.cart = []
        }

        
       
    },

    extraReducers: (builder) => {
        builder.addCase(singInG.pending, (state, action)=>{
            state.loading = true
        }),
        builder.addCase(singInG.fulfilled, (state, action) => {
            
            state.loading = false
            state.authorized = true
            state.name = action.payload
        }),
        builder.addCase(singInG.rejected, (state, action) => {
            
            state.loading = false
            state.error = true
            // state.errorMessage = action.payload 
        })

        ///==============
        // ///////////////listenOnAuth
        builder.addCase(listenOnAuth.pending, (state, action)=>{
            state.loading = true
        }),
        builder.addCase(listenOnAuth.fulfilled, (state, action) => {
            
            state.loading = false
            if(action.payload){
                state.authorized = true
                state.name = action.payload
            }else{
                state.authorized = false,
                state.name = ''
            }

            
        }),
        builder.addCase(listenOnAuth.rejected, (state) => {
            
            state.authorized = false
            state.loading = false
            state.error = true
            // state.errorMessage = action.payload 
        })

        // ///////////////
    }
})

export const {addCart, removeCart,increaseCartQuant, decreaseCartQuant, deleteCart, addFavorite, removeFav, changeSize, addOrder, clearCart } = useSlice.actions

export default useSlice.reducer