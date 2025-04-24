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

export const postAdditionalItems = createAsyncThunk('postAdditionalItem', async(additionalItems, {rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/additional-item/add-additional-item`, additionalItems);
       
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteAdditionalById = createAsyncThunk('deleteAdditionalById', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/additional-item/delete-additional-item-by-id/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

// this is not initialize on the inital state for direct getting the payload
export const updateMultipleAdditionalItems = createAsyncThunk('updateMultipleAdditionalItems', async(additionalData, {rejectWithValue}) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/additional-item/update-multiple-additiona-items`, additionalData);

        console.log("data add", additionalData);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


const additionalSlice = createSlice({
    name: 'additionalItems',
    initialState: {
        allAdditionalItems: [],
        additionalItemsByProposalId: [],
        postAdditionalItemResponse: [],
        deleteAdditionalByIdRes: [],
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
        .addCase(postAdditionalItems.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postAdditionalItems.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.additionalItemsByProposalId = action.payload; 
        })
        .addCase(postAdditionalItems.rejected, (state, _) => {
            state.loading = false;
            state.isSuccess = false;

            state.message = 'Error: Posting the additional items please check api response';
        })
    
        .addCase(deleteAdditionalById.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(deleteAdditionalById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.deleteAdditionalByIdRes = action.payload; 
        })
        .addCase(deleteAdditionalById.rejected, (state, _) => {
            state.loading = false;
            state.isSuccess = false;

            state.message = 'Error: Failed to delete the data';
        })
    
    }
});


export default additionalSlice;
