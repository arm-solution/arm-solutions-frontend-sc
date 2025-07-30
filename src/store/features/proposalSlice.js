import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const getAllProposal = createAsyncThunk('proposals/getAllProposal', async (_, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal`);
        
        return data;

    } catch (error) {
        return rejectWithValue(error.response.data);
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

export const updateProposal = createAsyncThunk('proposals/updateProposal', async({proposalFinal, id}, {rejectWithValue}) => {

    try {
        const result =  await axios.put(`${process.env.REACT_APP_API_BASE_URL}/proposal/edit-proposal/${id}`, proposalFinal);
        return result.data 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProposalByFilter = createAsyncThunk('proposal/getProposalByFilter', async(filter, {rejectWithValue}) => {
    try {
        const { data } =  await axios.post(`${process.env.REACT_APP_API_BASE_URL}/proposal/get-all-by-filter?page=1&limit=1`, filter);
        console.log("data", data);
        return data 
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        data: [],
        dataByFilter:[],
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
        // .addCase(getAllProposal.pending, (state, action) => {
        //     state.loading = true;
        //     state.isSuccess = false
        // })
        .addCase(getAllProposal.fulfilled, (state, action) => {
            // console.log("getAllProposal payload:", action.payload);
            state.loading = false;
            state.isSuccess = true;
            
            // const payload = action.payload;
            // console.log("the payload", payload);
            // state.data = Array.isArray(payload) ? payload : [];
            
        })
        // .addCase(getAllProposal.rejected, (state, action) => {
        //     state.isSuccess = false;
        //     state.loading = false;
        //     state.message = action.payload;
        // })
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
        .addCase(updateProposal.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false
        })
        .addCase(updateProposal.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        })
        .addCase(updateProposal.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "rejected"
        })
        .addCase(getProposalByFilter.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false
        })
        .addCase(getProposalByFilter.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.dataByFilter = action.payload;
        })
        .addCase(getProposalByFilter.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
            state.message = "rejected"
        })
    
    }, 

});


export const { resetState } = proposalSlice.actions;
export default proposalSlice;