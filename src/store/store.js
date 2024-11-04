import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import employeeAuthSlice from "./features/authEmployee";
import productSlice from "./features/productSlice";
import proposalSlice from "./features/proposalSlice";
import clientSlice from './features/clientsSlice';
import proposalItemSlice from "./features/proposalItemSlice";
import departmentSlice from "./features/departmentSlice";
import provinceSlice from "./features/getProvince";
import dtrSlice from "./features/dtrSlice";
import taxDiscountSlice from "./features/taxDiscountSlice";
import dtrRequestSlice from "./features/dtrRequestSlice";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        auth: employeeAuthSlice.reducer,
        products: productSlice.reducer,
        proposals: proposalSlice.reducer,
        clients: clientSlice.reducer,
        proposalItems: proposalItemSlice.reducer,
        departments: departmentSlice.reducer,
        provinces: provinceSlice.reducer,
        dtr: dtrSlice.reducer,
        taxDiscounts: taxDiscountSlice.reducer,
        dtrRequests: dtrRequestSlice.reducer
    }
})