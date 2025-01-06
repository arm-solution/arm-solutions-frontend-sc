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

export const getDiscountTaxAdditionalByproposalId = createAsyncThunk('taxDiscount/getAlltaxDiscountByProposalId', async(proposalID, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/get-additional-proposal-items/${proposalID}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const postDiscountAndTax = createAsyncThunk('taxDiscount/addTaxDiscount', async(taxDiscount, {rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/add-additional-proposal-items`, taxDiscount);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateTaxDiscountAndAdditional = createAsyncThunk('taxDiscount/updateTaxDiscount', async(taxDiscount, {rejectWithValue}) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/update-additional-multiple-proposal-item`, taxDiscount);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteTaxDiscountAdditionalByProposalId = createAsyncThunk('taxDiscount/deleteTaxDiscountAdditionalByProposalId', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/delete-additional-proposal-item-by-proposal-id/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteTaxDiscountAdditionalById = createAsyncThunk('taxDiscount/deleteTaxDiscountAdditionalById', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/additional-proposal-items/delete-additional-proposal-item-by-id/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const taxDiscountSlice = createSlice({
    name: 'additional',
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
        .addCase(getDiscountTaxAdditionalByproposalId.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getDiscountTaxAdditionalByproposalId.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload;
        })
        .addCase(getDiscountTaxAdditionalByproposalId.rejected, (state, action) => {
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
        .addCase(updateTaxDiscountAndAdditional.pending, (state, action) => {
            state.loading = true;
        }) 
        .addCase(updateTaxDiscountAndAdditional.fulfilled, (state, action) => {
            state.loading = false;
        }) 
        .addCase(updateTaxDiscountAndAdditional.rejected, (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }) 
    }
});

export default taxDiscountSlice;