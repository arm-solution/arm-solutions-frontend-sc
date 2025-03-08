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

export const postMessageRequest = createAsyncThunk('postMessageRequest', async(messageRequestData, {rejectWithValue}) => {
    try {
        const { email, ...rest } = messageRequestData;
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/message-request/add-new`, messageRequestData);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
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
        .addCase(postMessageRequest.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postMessageRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.addedStatus = true;
            // state.data = [...state.data, action.payload];
        })
        .addCase(postMessageRequest.rejected, (state, action) => {
            state.addedStatus = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default messageRequestSlice;