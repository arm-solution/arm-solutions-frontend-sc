import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import employeeAuthSlice from "./features/authEmployee";
import productSlice from "./features/productSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        auth: employeeAuthSlice.reducer,
        products: productSlice.reducer
    }
})