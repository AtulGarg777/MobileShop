import { configureStore } from "@reduxjs/toolkit"
import itemsReducer from './features/items/itemsSlice'
import productReducer from './features/products/products'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        products: productReducer
    }
})