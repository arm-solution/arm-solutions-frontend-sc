import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllDtrRequest = createAsyncThunk('getAllDtrRequest', async(_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr-request`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const postDtrRequest = createAsyncThunk('postDtrRequest', async(dtrRequestSlice, {rejectWithValue}) => {
    try {

        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/dtr-request/add-dtr-request`, dtrRequestSlice);

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


const dtrRequestSlice = createSlice({
    name: 'dtrRequest',
    initialState: {
        getAllDtrRequestResponse: [],
        postDtrRequestResponse: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllDtrRequest.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAllDtrRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.getAllDtrRequestResponse = action.payload;
        })
        .addCase(getAllDtrRequest.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "The request is rejected";
        })
        .addCase(postDtrRequest.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postDtrRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.postDtrRequestResponse = action.payload;
        })
        .addCase(postDtrRequest.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "The request is rejected";
        })
    }
})

export default dtrRequestSlice;