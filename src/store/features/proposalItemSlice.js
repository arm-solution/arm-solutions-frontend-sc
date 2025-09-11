import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const saveProposalItems = createAsyncThunk('proposalItems/addProposalItems', async (proposalItems, { rejectWithValue }) => {
    try {
        const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/add-proposal-items`, proposalItems);
        return result.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getProposalItemsByProposalId = createAsyncThunk('proposalItems/getitembyproposalid', async (proposal_id, { rejectWithValue }) => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/get-item/${proposal_id}`);
        
        // console.log("proposal items", result.data);
        const newSet = result.data.map(d => ({
                base_price: parseInt(d.proposal_price),
                sku: d.product_base_sku,
                stock: d.product_base_stock_quantity,
                product_name: d.product_name,
                product_type: d.product_type,
                qty: d.proposal_quantity,
                description: d.product_descriptio,
                name: d.product_name,
                description: d.product_description,
                id: d.product_id,
                category_name: d.product_category_name,
                proposal_item_id: d.id,
                item_total: d.item_total

        }))

        return newSet

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const updateProposalItems = createAsyncThunk('proposalItems/updateProposalItems', async(items, {rejectWithValue}) =>{
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/update-multiple-proposal-item`, items);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const deleteProposalItem = createAsyncThunk('proposalItems/deleteProposalItem', async(id, {rejectWithValue}) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/delete-proposal-item/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const deleteMultipleProposalItems = createAsyncThunk('proposalItems/deleteProposalItems', async (ids, { rejectWithValue }) => {
   
      try {
        const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/proposal-items/delete-proposal-items`, { data: ids });
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

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
            .addCase(saveProposalItems.rejected, (state, _) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getProposalItemsByProposalId.pending, (state, _ ) => {
                state.loading = true;
                state.isSuccess = false;
            })
            .addCase(getProposalItemsByProposalId.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getProposalItemsByProposalId.rejected, (state, _) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(updateProposalItems.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
            })
            .addCase(updateProposalItems.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;

            })
            .addCase(updateProposalItems.rejected, (state, _) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(deleteProposalItem.pending, (state, _) => {
                state.loading = true;
                state.isSuccess = false;
            })
            .addCase(deleteProposalItem.fulfilled, (state, _) => {
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(deleteProposalItem.rejected, (state, _) => {
                state.loading = false;
                state.isSuccess = false;
                state.message = "rejected";
            })
            // .addCase(deleteProposalItems.pending, (state) => {
            //     state.loading = true;
            //     state.isSuccess = false;
            // })
            // .addCase(deleteProposalItems.fulfilled, (state, _) => {
            //     state.loading = false;
            //     state.isSuccess = true;
            // })
            // .addCase(deleteProposalItems.rejected, (state, _) => {
            //     state.loading = false;
            //     state.isSuccess = false;
            //     state.message = "rejected";
            // });
    }
})

export default proposalItemSlice;
