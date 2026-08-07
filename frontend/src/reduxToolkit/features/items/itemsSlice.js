import { createSlice } from "@reduxjs/toolkit";


export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        value: []
    }, reducers: {
        addProducts: (state, action) => {
            state.value = action.payload
        },
        removeProduct: (state, action) => {
            state.value = state.value.filter(item => item._id !== action.payload)
        }

    }
})

export default itemsSlice.reducer;
export const { addProducts, removeProduct } = itemsSlice.actions;