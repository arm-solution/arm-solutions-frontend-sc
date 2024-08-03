import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllProposal = createAsyncThunk('proposals/getAllProposal', async (_, {rejectWithValue}) => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal`);
        return res.data;

    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const createProposal = createAsyncThunk('proposals/createProposal', async(proposalData, {rejectWithValue, getState}) => {

    try {
      const result =  await axios.post(`${process.env.REACT_APP_API_BASE_URL}/proposal/add-proposal`, proposalData);
        // return getState().proposals;
        return result.data 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})




const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {
        resetState: state => {
            state.data = [];
            state.isSuccess = false;
            state.loading = true;
            state.message = '';
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getAllProposal.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false
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
        .addCase(createProposal.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false
        })
        .addCase(createProposal.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        })
        .addCase(createProposal.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "rejected"
        })
    
    }, 

});


export const { resetState } = proposalSlice.actions;
export default proposalSlice;