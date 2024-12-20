import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addNewProduct = createAsyncThunk('addNewProduct', async (product, {rejectWithValue}) => {
    
    try {

        const res = axios.post('http://localhost:5000/products/save-product', product);
        return res.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
    
})


export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    try {
        const response = await axios.get('http://localhost:5000/products/get-products');
        return [...response.data]
    } catch (error) {
        return error.message;
    }
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: '',
    },
    reducers: {
        // addProduct: {
        //     reducer(state, action) {
        //         state.data.push(action.payload)
        //     },

        //     prepare(productDetails) {
        //         return {
        //             payload: productDetails
        //         }
        //     }
        // }
    },
    extraReducers(builder) {
        builder
        .addCase(getAllProducts.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addNewProduct.pending, (state, action) => {
                state.loading = true;
        })
        .addCase(addNewProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(addNewProduct.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        })

        
    }
});


export default productSlice;