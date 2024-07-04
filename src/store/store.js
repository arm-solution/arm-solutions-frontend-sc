import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import employeeAuthSlice from "./features/authEmployee";
import productSlice from "./features/productSlice";
import proposalSlice from "./features/proposalSlice";
import clientSlice from './features/clientsSlice'

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        auth: employeeAuthSlice.reducer,
        products: productSlice.reducer,
        proposals: proposalSlice.reducer,
        clients: clientSlice.reducer
    }
})