"use client"

import { CartType, InitialStateType, OrderType, favoriteType,  } from "@/app/interface"
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit" 
import { UserCredential, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth/cordova"
import { auth, provider } from "../../resource/firebase"
import firebase from "firebase/auth"


const initialState: InitialStateType = {
    cart: [],
    productQuantity: 0,
    favorite: [],
    Orders: [],
    checkoutList: null, 
    name: '',
    authorized: false,
// state-loading
    loading: false,
    error: false,
    errorMessage: ''
}

   export  const singInG = createAsyncThunk('user/singInG', async ()=>{
try{
   

    const result: UserCredential = await signInWithRedirect(auth, provider)
    if(result.user){
        document.cookie = `{"authorize": true}`
    }

    // console.log(result.)

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
    // console.log(subscribe)

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

            localStorage.setItem('state', JSON.stringify({...state}))
        },

        removeCart: (state, action) => {
                state.cart = state.cart.filter(cart => cart.id !== action.payload)

                localStorage.setItem('state', JSON.stringify({...state}))

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
            localStorage.setItem('state', JSON.stringify({...state}))

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

            localStorage.setItem('state', JSON.stringify({...state}))

        },
        deleteCart: (state, action) => {
            state.cart = state.cart.filter((cart: CartType) => cart.id !== action.payload)

            localStorage.setItem('state', JSON.stringify({...state}))

        },


        //================================
        // ===============================

        increaseCheckOrderQuantity: (state, action) => {
            if(state.checkoutList){
                
                            state.checkoutList = {
                                ...state.checkoutList,
                                
                                orders: state.checkoutList?.orders.map((cart : CartType) => {
                                    if(cart.id === action.payload){
                                        return {
                                            ...cart,
                                            quantity: cart.quantity + 1
                
                                        }
                                    }else{
                                        return cart
                                    }
                                })
                            }

            }
            localStorage.setItem('state', JSON.stringify({...state}))

        },

        decreaseCheckOrderQuantity: (state, action) => {
            if(state.checkoutList){
                
                            state.checkoutList = {
                                ...state.checkoutList,
                                
                                orders: state.checkoutList?.orders.map((cart : CartType) => {
                                    if(cart.id === action.payload){
                                        return {
                                            ...cart,
                                            quantity: cart.quantity - 1
                
                                        }
                                    }else{
                                        return cart
                                    }
                                })
                            }

            }

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        changeOrderSize: (state, action) => {
            if(state.checkoutList){
                
                            state.checkoutList = {
                                ...state.checkoutList,
                                
                                orders: state.checkoutList?.orders.map((cart : CartType) => {
                                    if(cart.id === action.payload.id){
                                        return {
                                            ...cart,
                                            size: action.payload.size
                
                                        }
                                    }else{
                                        return cart
                                    }
                                })
                            }

            }

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        deleteSingleOrder: (state, action) => {
            if(state.checkoutList){

                state.checkoutList = {
                    ...state.checkoutList,
                    orders: state.checkoutList.orders.filter((cart: CartType) => cart.id !== action.payload)
                }
            }

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        clearOrder: (state) => {
            state.checkoutList = null

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        cancelOrder: (state, action) => {
            state.Orders = state.Orders.filter((order: OrderType) => order.id !== action.payload)
        },

        // ==================
        // ===============

        addFavorite: (state, action) => {
            if(state.favorite.some((fav: favoriteType)=> fav.id === action.payload.id)){
                return
            }
            state.favorite = [...state.favorite, {...action.payload}]

            localStorage.setItem('state', JSON.stringify({...state}))

        },
        removeFav: (state, action) => {
            // console.log(action.payload)
            state.favorite = state.favorite.filter((fav: favoriteType) => fav.id !== action.payload.id)

            localStorage.setItem('state', JSON.stringify({...state}))

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

            localStorage.setItem('state', JSON.stringify({...state}))

        },
        setAuthorize: (state, action) => {

            if(action.payload && typeof action.payload === "string"){
      const cookie = JSON.parse(action.payload)
      state.authorized = cookie.authorize

            }

            if(action.payload && typeof action.payload === "boolean"){
                state.authorized = action.payload

            }

            if(!action.payload){
                return
            }

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        addOrder: (state, action) => {
            state.Orders = [...state.Orders, action.payload]

            localStorage.setItem('state', JSON.stringify({...state}))

        },
        clearCart: (state) => {
            state.cart = []

            localStorage.setItem('state', JSON.stringify({...state}))

        },
        setCheckOrder: (state, action) => {
            state.checkoutList = action.payload

            localStorage.setItem('state', JSON.stringify({...state}))

        },

        completeOrder: (state, action) => {
                state.Orders = state.Orders.map((order: OrderType) => {
                    if(order.id === action.payload){
                        return {
                            ...order,
                            pending: false,
                            completed: true
                        }
                    }else{
                        return order
                    }
                })
        },

        setStateCookies:(state) => {
            document.cookie = `${state}`
        },

        getState: (state) => {
            const savedState: string | null | any = localStorage.getItem('state')
            // console.log(savedState)
            const parsedState = JSON.parse(savedState)
            console.log(parsedState)

            if( parsedState === null) return 

            if(parsedState && typeof parsedState == "object"){
                state.Orders = parsedState.Orders
                state.authorized = parsedState.authorized
                state.cart = parsedState.cart
                state.checkoutList = parsedState.checkoutList
                state.error = parsedState.error
                state.errorMessage = parsedState.errorMessage
                state.favorite = parsedState.favorite
                state.loading = parsedState.loading
                state.name = parsedState.name
                state.productQuantity = parsedState.productQuantity
                console.log(state)
            }
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

export const {addCart, removeCart,increaseCartQuant, decreaseCartQuant, deleteCart, addFavorite, removeFav, changeSize, addOrder, clearCart, setAuthorize, setCheckOrder, increaseCheckOrderQuantity, decreaseCheckOrderQuantity,changeOrderSize,deleteSingleOrder, clearOrder, getState, cancelOrder, completeOrder, setStateCookies } = useSlice.actions

export default useSlice.reducer