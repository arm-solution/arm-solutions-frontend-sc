import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllProposal = createAsyncThunk('getAllProposal', async (_, {rejectWithValue}) => {

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal`);
        return res.data;

    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

export const createProposal = createAsyncThunk('createProposal', async(proposalData, {rejectWithValue, getState}) => {

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
            state.message = 'jjiaj';
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getAllProposal.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false

            // console.log('get proposal pending ', state.isSuccess);
        })
        .addCase(getAllProposal.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            
            state.data = action.payload;
            // console.log('get proposal fullfilled ', state.isSuccess);
        })
        .addCase(getAllProposal.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload;
            // console.log('get proposal rejected ', state.isSuccess);
        })
        .addCase(createProposal.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false

            // console.log('create proposal pending ', state.isSuccess);
        })
        .addCase(createProposal.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            // console.log('create proposal fullfiled ', state.isSuccess);
        })
        .addCase(createProposal.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "rejected"
            // console.log('create proposal rejected ', state.isSuccess);
        })
    }, 

});


export const { resetState } = proposalSlice.actions;
export default proposalSlice;