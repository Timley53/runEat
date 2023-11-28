"use client"

import { uiInitialState,  } from "@/app/interface"
import { createSlice} from "@reduxjs/toolkit" 

const initialState: uiInitialState = {
    pizza: true,
    burger: false,
    desert: false,
    pending: true,
    completed: false,
    canceled: false,
    modal: true,
    modalDetails: {},
    cartNotification: false,
    confirmation: false,
    confirmationType: '',
    confirmationTypeId: ''

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
        state.pizza = false
        state.burger = true
        state.desert = false
      },
      showDesert: (state) => {
        state.pizza = false
        state.burger = false
        state.desert = true
      },
      showPending: (state) => {
        state.completed = false
        state.canceled = false
        state.pending = true
      },
      showCompleted: (state) => {
        state.completed = true
        state.canceled = false
        state.pending = false
      },
      showCanceled: (state) => {
        state.completed = false
        state.canceled = true
        state.pending = false
      },
      openModal: (state) => {
        state.modal = true
      },
      closeModal: (state) => {
        state.modal = false
      },

      showCartNotification: (state) => {
        state.cartNotification = true
      },

      hideCartNotification: (state) => {
        state.cartNotification = false
      },
       showConfirm: (state, action) => {
      state.confirmation = action.payload.modal,
      state.confirmationType = action.payload.type
      state.confirmationTypeId = action.payload.id
       }
       


    }
})

export const {showPizza, showBuger, showDesert, showCanceled,showCompleted,showPending,openModal, closeModal, showCartNotification, hideCartNotification, showConfirm } = uiSlice.actions

export default uiSlice.reducer