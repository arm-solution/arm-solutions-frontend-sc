import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllCareers = createAsyncThunk('getAllCareers', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/careers`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getCareerById  =createAsyncThunk('getCareerById', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/careers/get/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateCareer = createAsyncThunk('updateCareer', async(careerData, {rejectWithValue}) => {
    try {
        const { id, fullname, ...rest } = careerData;
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/careers/update/${id}`, rest)

        return data;
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


export const deleteCareer = createAsyncThunk('deleteCareer', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/careers/delete/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const addNewCareer = createAsyncThunk('addNewCareer', async(clientData, {rejectWithValue}) => {
    try {
        const { fullname, ...rest } = clientData;
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/careers/add`, rest);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})


const careerSlice = createSlice({
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
        .addCase(getAllCareers.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAllCareers.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllCareers.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(getCareerById.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getCareerById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getCareerById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateCareer.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(updateCareer.fulfilled, (state, _) => {
            state.loading = false;
            state.isSuccess = true;

            // state.data = action.payload;
        })
        .addCase(updateCareer.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addNewCareer.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(addNewCareer.fulfilled, (state, action) => {
            state.loading = false;
            state.addedStatus = true;
            // state.data = [...state.data, action.payload];
        })
        .addCase(addNewCareer.rejected, (state, action) => {
            state.addedStatus = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});


export default careerSlice;