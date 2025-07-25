import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postMessage = createAsyncThunk('postMessage', async (message, {rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message-request/add-new`, message);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const messageRequestSlice = createSlice({
    name: 'messageRequest',
    initialState: {
        messages: [],
        postMessageResponse: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(postMessage.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.postMessageResponse = action.payload;
        })
        .addCase(postMessage.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});

export default messageRequestSlice;