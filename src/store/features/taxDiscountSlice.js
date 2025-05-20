import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDiscountAndTax = createAsyncThunk('taxDiscount/getAlltaxDiscount', async(_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tax-discount-proposal-items`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getDiscountAndTaxByproposalId = createAsyncThunk('taxDiscount/getAlltaxDiscountByProposalId', async(proposalID, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/tax-discount-proposal-items/get-tax-discount-proposal-items/${proposalID}`);

        console.log("data from database", data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const postDiscountAndTax = createAsyncThunk('taxDiscount/addTaxDiscount', async(taxDiscount, {rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/tax-discount-proposal-items/add-tax-discount-proposal-items`, taxDiscount);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateTaxAndDiscount = createAsyncThunk('taxDiscount/updateTaxDiscount', async(taxDiscount, {rejectWithValue}) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/tax-discount-proposal-items/update-tax-discount-multiple-proposal-item`, taxDiscount);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteMultipleTaxDiscount = createAsyncThunk('taxDiscount/deleteMultipleTaxDiscount', async(ids, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/delete-tax-discount-multiple-proposal-items`, { data: ids });
        console.log("deleteMultipleTaxDiscount", data);

        return data;
    } catch (error) {

        console.log("nasa catch po")
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const taxDiscountSlice = createSlice({
    name: 'taxDiscount',
    initialState: {
        data: [],
        postStatus: [],
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
        .addCase(postDiscountAndTax.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postDiscountAndTax.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true; 

            state.postStatus = action.payload;
        })
        .addCase(postDiscountAndTax.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
        })
        .addCase(updateTaxAndDiscount.pending, (state, action) => {
            state.loading = true;
        }) 
        .addCase(updateTaxAndDiscount.fulfilled, (state, action) => {
            state.loading = false;
        }) 
        .addCase(updateTaxAndDiscount.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }) 
    }
});

export default taxDiscountSlice;