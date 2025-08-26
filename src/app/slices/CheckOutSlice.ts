import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id:"",
  balance:0
}

export const CheckOutSlice = createSlice({
  name:"checkout",
  initialState,
  reducers:{
    setCheckoutId(state,action: PayloadAction<[string,number]>) {
      state.id = action.payload[0]
      state.balance = action.payload[1]
    }
  }
})

export const {setCheckoutId} = CheckOutSlice.actions