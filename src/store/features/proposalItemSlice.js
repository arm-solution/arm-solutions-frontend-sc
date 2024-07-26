import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const saveProposalItems = createAsyncThunk('proposals/addProposalItems', async (proposalItems, { rejectWithValue }) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/add-proposal-items`, proposalItems);
        return result.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProposalItemsByProposalId = createAsyncThunk('proposal/getitembyproposalid', async (proposal_id, { rejectWithValue }) => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/get-item/${proposal_id}`);
        // console.log('result data ',result.data)

        const newSet = result.data.map(d => ({
                base_price: parseInt(d.product_base_price),
                sku: d.product_base_sku,
                stock: d.product_base_stock_quantity,
                product_name: d.product_name,
                product_type: d.product_type,
                qty: d.proposal_quantity,
                description: d.product_descriptio,
                name: d.product_name,
                id: d.product_id,
                category_name: d.product_category_name,
                proposal_item_id: d.id // this is the main id
        }))

        return newSet

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const proposalItemSlice = createSlice({
    name: 'proposalItem',
    initialState: {
        data: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveProposalItems.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })
            .addCase(saveProposalItems.fulfilled, (state) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(saveProposalItems.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getProposalItemsByProposalId.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })
            .addCase(getProposalItemsByProposalId.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getProposalItemsByProposalId.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            });
    }
})

export default proposalItemSlice;