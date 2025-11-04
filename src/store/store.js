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
import additionalSlice from "./features/additional.Slice";
import messageRequestSlice from "./features/messageRequestSlice";
import additionalEarningsSlice from './features/additionalEarningsSlice';
import earningSlice from './features/earningSlice';
import dashboardSlice from "./features/dashboardDataSlice";
import categorySlice from "./features/categorySlice";
import jobOrderSlice from './features/jobOrder.slice'
import overtimeSlice from "./features/overtime.Slice";

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
        dtrRequests: dtrRequestSlice.reducer,
        additionalItems: additionalSlice.reducer,
        messageRequests: messageRequestSlice.reducer,
        additionalEarnings: additionalEarningsSlice.reducer,
        earnings: earningSlice.reducer,
        dasboardData: dashboardSlice.reducer,
        categories: categorySlice.reducer,
        jobOrders: jobOrderSlice.reducer,
        overtime: overtimeSlice.reducer,
    }
})