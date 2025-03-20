import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addNewProduct = createAsyncThunk('addNewProduct', async (product, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products/add-product`, product);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const deleteProduct = createAsyncThunk('deleteProduct', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/delete/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (product, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/products/update-product`, product);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// export const getAllProducts = createAsyncThunk('getAllProducts', async () => {
//     try {
//         const response = await axios.get('http://localhost:5000/products/get-products');
//         return [...response.data]
//     } catch (error) {
//         return error.message;
//     }
// })
export const getAllProducts = createAsyncThunk('getAllProducts', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

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