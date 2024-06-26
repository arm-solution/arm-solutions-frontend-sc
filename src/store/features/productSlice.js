import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addNewProduct = createAsyncThunk('addNewProduct', async () => {
    
})


export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
    try {
        const response = await axios.get('http://localhost:5000/products/get-products');
        console.log('response', response)
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

        
    }
});


export default productSlice;