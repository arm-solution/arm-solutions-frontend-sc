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


export const deleteCareer = createAsyncThunk('deleteCareer', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/careers/delete/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
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
    }
});


export default careerSlice;