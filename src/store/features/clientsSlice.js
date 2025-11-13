import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllCleints = createAsyncThunk('getAllCleints', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/clients`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getClientById  =createAsyncThunk('getClientById', async(id, {rejectWithValue}) => {
    try {

        if(!id) {
            console.error("no id provided");
            return;
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/clients/get-client-by-id/${id}`);


        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateClient = createAsyncThunk('updateClient', async(clientData, {rejectWithValue}) => {
    try {
        const { id, fullname, ...rest } = clientData;
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/clients/update-client/${id}`, rest)

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteClient = createAsyncThunk('deleteClient', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/clients/delete-client/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
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
        loading: false,
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
        .addCase(getClientById.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getClientById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getClientById.rejected, (state, action) => {
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