import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllCategory = createAsyncThunk('category/getAllCategory', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});




const categorySlice = createSlice({
    name: 'category',
    initialState: {
        _getAllcategory: [],
        isSuccess: false,
        loading: true,
        message: '',
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllCategory.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state._getAllcategory = action.payload;
        })
        .addCase(getAllCategory.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default categorySlice;