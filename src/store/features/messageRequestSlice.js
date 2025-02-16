import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



export const getAllMessageRequest = createAsyncThunk('getAllMessageRequest', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/message-request`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const deleteMessageRequest= createAsyncThunk('deleteMessageRequest', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/message-request/delete/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



const messageRequestSlice = createSlice({
    name: 'message_request',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllMessageRequest.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAllMessageRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllMessageRequest.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default messageRequestSlice;