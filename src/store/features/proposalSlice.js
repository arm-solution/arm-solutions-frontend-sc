import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllProposal = createAsyncThunk('getAllProposal', async (proposal, {rejectWithValue}) => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal`);
        return res.data;

    } catch (error) {
        return error.message;
    }
});

const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAllProposal.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getAllProposal.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getAllProposal.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
        })
    }
});

export default proposalSlice;