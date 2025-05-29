import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postEarning = createAsyncThunk('post/earning', async(data, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/earnings/add`, data);
        console.log("postEarnings", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


const earningSlice = createSlice({
    name: 'earnings',
    initialState: {
        postEarning: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(postEarning.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postEarning.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.postEarning = action.payload;
        })
        .addCase(postEarning.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
});

export default earningSlice;