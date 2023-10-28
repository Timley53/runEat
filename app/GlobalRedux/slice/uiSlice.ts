"use client"

import { uiInitialState,  } from "@/app/interface"
import { createSlice} from "@reduxjs/toolkit" 

const initialState: uiInitialState = {
    pizza: true,
    burger: false,
    desert: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      showPizza: (state) => {
        state.pizza = true,
        state.burger = false,
        state.desert = false
      },
      showBuger: (state) => {
        state.pizza = false,
        state.burger = true,
        state.desert = false
      },
      showDesert: (state) => {
        state.pizza = false,
        state.burger = false,
        state.desert = true
      }
    }
})

export const {showPizza, showBuger, showDesert} = uiSlice.actions

export default uiSlice.reducer