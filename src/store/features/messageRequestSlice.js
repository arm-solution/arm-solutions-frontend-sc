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

export const getMessageRequestById = createAsyncThunk('getMessageRequestById', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/message-request/get/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateMessageRequest = createAsyncThunk('updateMessageRequest', async(careerData, {rejectWithValue}) => {
    try {
        const { id, fullname, ...rest } = careerData;
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/message-request/update/${id}`, rest)

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

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
        .addCase(getMessageRequestById.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getMessageRequestById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getMessageRequestById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateMessageRequest.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(updateMessageRequest.fulfilled, (state, _) => {
            state.loading = false;
            state.isSuccess = true;

            // state.data = action.payload;
        })
        .addCase(updateMessageRequest.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
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