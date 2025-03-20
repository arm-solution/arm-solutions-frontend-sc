import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllServices = createAsyncThunk('getAllServices', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/services`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getServiceById  =createAsyncThunk('getServiceById', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/services/get/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateService = createAsyncThunk('updateService', async(serviceData, {rejectWithValue}) => {
    try {
        const { id, fullname, ...rest } = serviceData;
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/services/update/${id}`, rest)

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteService = createAsyncThunk('deleteService', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/services/delete/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const addNewService = createAsyncThunk('addNewService', async(serviceData, {rejectWithValue}) => {
    try {
        const { name, ...rest } = serviceData;
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/services/add-new`, rest);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllServices.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAllServices.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllServices.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(getServiceById.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getServiceById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getServiceById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateService.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(updateService.fulfilled, (state, _) => {
            state.loading = false;
            state.isSuccess = true;

            // state.data = action.payload;
        })
        .addCase(updateService.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addNewService.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(addNewService.fulfilled, (state, action) => {
            state.loading = false;
            state.addedStatus = true;
            // state.data = [...state.data, action.payload];
        })
        .addCase(addNewService.rejected, (state, action) => {
            state.addedStatus = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default serviceSlice;