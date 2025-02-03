import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAdditionalByProposalID = createAsyncThunk('getAdditionalByProposalID', async (proposalId, {rejectWithValue}) => {

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/additional-item/${proposalId}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


const additionalSlice = createSlice({
    name: 'additionalItems',
    initialState: {
        allAdditionalItems: [],
        additionalItemsByProposalId: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getAdditionalByProposalID.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getAdditionalByProposalID.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.additionalItemsByProposalId = action.payload; 
        })
        .addCase(getAdditionalByProposalID.rejected, (state, _) => {
            state.loading = false;
            state.isSuccess = false;

            state.message = 'Error: Please Check the API';
        })
    }
});


export default additionalSlice;
