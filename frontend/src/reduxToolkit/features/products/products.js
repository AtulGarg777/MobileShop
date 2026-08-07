import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'Products',
    initialState: {
        value: []
    }, reducers: {
        prodcutsList: (state, action) => {
            state.value = action.payload
        }
    }
})

export default productSlice.reducer;
export const { prodcutsList } = productSlice.actions