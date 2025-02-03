import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getManPower = createAsyncThunk('dashboard/getManPower', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/total-manpower`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        manpower: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getManPower.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getManPower.fulfilled, (state, action) => {
            state.loading = false;
            state.manpower = action.payload;
            state.isSuccess = true;
        })
        .addCase(getManPower.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })

    }
})

export default dashboardSlice;