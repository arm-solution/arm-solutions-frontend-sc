import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDiscountAndTax = createAsyncThunk('taxDiscount/getAlltaxDiscount', async(_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getDiscountAndTaxByproposalId = createAsyncThunk('taxDiscount/getAlltaxDiscountByProposalId', async(proposalID, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/get-additional-proposal-items/${proposalID}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const postDiscountAndTax = createAsyncThunk()

const taxDiscountSlice = createSlice({
    name: 'additional',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getDiscountAndTaxByproposalId.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getDiscountAndTaxByproposalId.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getDiscountAndTaxByproposalId.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
});

export default taxDiscountSlice;