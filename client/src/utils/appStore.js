import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import favtReducer from './favtRestro'
const appStore=configureStore({
        reducer:{
                cart:cartReducer,
                favt:favtReducer
        }
});

export default appStore