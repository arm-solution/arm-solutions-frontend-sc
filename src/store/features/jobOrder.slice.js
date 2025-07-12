import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllJobOrder = createAsyncThunk('jobOrder/getAllJobOrder', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/job-order`);
    return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const addNewJobOrder = createAsyncThunk('jobOrder/addNewJobOrder', async (jo, {rejectWithValue}) => {
    try {
       
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job-order/add-job-order`, jo);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
});

export const getAllJobOrderByFilter = createAsyncThunk('jobOrder/getAllJobOrderByFilter', async({filter, page, limit}, {rejectWithValue}) => {
    try {

       const pageNum = page > 0 ? page : 1;
       const limitNum = limit > 0 ? limit : 10;
       
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/job-order//get-all-by-filter?page=${pageNum}&limit=${limitNum}`, filter);

        return data;

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})


const jobOrderSlice = createSlice({
    name: 'jobOrder',
    initialState: {
        allJobOrder: [],
        allJobOrderByFilter: [],
        isSuccess: false,
        loading: false,
        filterJoLoading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllJobOrder.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAllJobOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.allJobOrder = action.payload;
        })
        .addCase(getAllJobOrder.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(addNewJobOrder.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(addNewJobOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

        })
        .addCase(addNewJobOrder.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(getAllJobOrderByFilter.pending, (state, _) => {
            state.filterJoLoading = true;
        })
        .addCase(getAllJobOrderByFilter.fulfilled, (state, action) => {
            state.filterJoLoading = false;
            state.isSuccess = true;
            state.allJobOrderByFilter = action.payload
        })
        .addCase(getAllJobOrderByFilter.rejected, (state, action) => {
            state.isSuccess = false;
            state.filterJoLoading = false;
            state.message = action.payload;
        })
    }
})

export default jobOrderSlice;