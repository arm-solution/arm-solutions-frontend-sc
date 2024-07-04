import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllCleints = createAsyncThunk('getAllCleints', async (clients, {rejectWithValue}) => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/clients`);
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const clientSlice = createSlice({
    name: 'client',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllCleints.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllCleints.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllCleints.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default clientSlice;