import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllCleints = createAsyncThunk('getAllCleints', async (_, {rejectWithValue}) => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/clients`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const updateClient = createAsyncThunk('updateClient', async(clientData, {rejectWithValue}) => {
    try {
        const { id, fullname, ...rest } = clientData;
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/clients/update-client/${id}`, rest)

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const addNewClient = createAsyncThunk('addNewClient', async(clientData, {rejectWithValue}) => {
    try {
        const { fullname, ...rest } = clientData;
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/clients/add-client`, rest);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})

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
        .addCase(getAllCleints.pending, (state, _) => {
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
        .addCase(updateClient.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(updateClient.fulfilled, (state, _) => {
            state.loading = false;
            state.isSuccess = true;

            // state.data = action.payload;
        })
        .addCase(updateClient.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addNewClient.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(addNewClient.fulfilled, (state, action) => {
            state.loading = false;
            state.addedStatus = true;
            // state.data = [...state.data, action.payload];
        })
        .addCase(addNewClient.rejected, (state, action) => {
            state.addedStatus = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default clientSlice;