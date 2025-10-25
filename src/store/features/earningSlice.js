import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postEarning = createAsyncThunk('post/earning', async(earning, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/earnings/add`, earning);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getFullEarnings = createAsyncThunk('get/getFullEarnings', async(id, { rejectWithValue }) => {
    try {
        if(!id) {
            return console.error("ERROR: No id provided");
        }
        const  data  = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/earnings/get-by-id/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getEarningsByUserId = createAsyncThunk('get/getEarningsByUserId', async(id, { rejectWithValue }) => {
    try {

        if(!id) {
            return console.error("ERROR: No id provided");
        }

        const { data }  = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/earnings/get-by-employee-id/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getEarningsByUserIdWithPagination = createAsyncThunk(
  'earnings/getByUserIdWithPagination',
  async (
    { employeeId, page = 1, limit = 10, startDate = '', endDate = '' },
    { rejectWithValue }
  ) => {
    try {
      if (!employeeId) {
        throw new Error('ERROR: No employee ID provided');
      }

      const params = new URLSearchParams();

      // ✅ Append pagination + optional filters
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/earnings/get-by-id-with-pagination/${employeeId}?${params.toString()}`
      );


      // Response already has: success, message, page, limit, total, totalPages, data[]
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


const earningSlice = createSlice({
    name: 'earnings',
    initialState: {
        postEarning: [],
        _getFullEarnings: [],
        _getEarningsByUserId: [],
        _getEarningsByUserWithPagination: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {
        resetFullEarnings: (state) => {
            state._getFullEarnings = [];
        }
    },
    extraReducers(builder) {
        builder
        .addCase(postEarning.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(postEarning.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.postEarning = action.payload;
        })
        .addCase(postEarning.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(getFullEarnings.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getFullEarnings.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state._getFullEarnings = action.payload;
        })
        .addCase(getFullEarnings.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(getEarningsByUserId.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getEarningsByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state._getEarningsByUserId = action.payload;
        })
        .addCase(getEarningsByUserId.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(getEarningsByUserIdWithPagination.pending, (state, _) => {
            state.loading = true;
        })
        .addCase(getEarningsByUserIdWithPagination.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state._getEarningsByUserWithPagination = action.payload;
        })
        .addCase(getEarningsByUserIdWithPagination.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
});


export const { resetFullEarnings } = earningSlice.actions;
export default earningSlice;