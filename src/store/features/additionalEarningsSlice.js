import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const postAdditionalEarnings = createAsyncThunk('additionalEarning/post', async(additional, { rejectWithValue }) =>{
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/earnings-additional/add`, additional);
        console.log("postAdditionalEarnings", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})



const additionalEarningsSlice = createSlice({
    name: 'dditionalEarnings',
    initialState: {
        postAdditionalEarnings: [],
        isSuccess: false,
        postAdditionalEarningBool: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(postAdditionalEarnings.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postAdditionalEarnings.fulfilled, (state, action) => {
            state.loading = false;
            state.postAdditionalEarningBool = true;
            state.postAdditionalEarnings = action.payload;
        })
        .addCase(postAdditionalEarnings.rejected, (state, action) => {
            state.postAdditionalEarningBool = false;
            state.loading = false;
            state.message = action.payload
        })

    }
});

export default additionalEarningsSlice;