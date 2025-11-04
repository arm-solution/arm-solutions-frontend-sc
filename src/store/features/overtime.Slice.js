import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postOvertime = createAsyncThunk('ot/postOvertime', async(ot, {rejectWithValue}) => {
    try {

        const {data} = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/overtime/post-multiple-overtime`, ot)
        
        return data;
    } catch (error) {
         return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const getOvertimeByUserId = createAsyncThunk(
  'ot/getOvertimeByUserId',
  async (params, { rejectWithValue }) => {
    try {
      const { id, ...rest } = params;

      if (!id) {
        console.error("No user ID provided");
        return rejectWithValue("No user ID provided");
      }

      // Build query string dynamically from rest of the parameters
      const queryString = new URLSearchParams(rest).toString();

      // Example URL: /overtime/get-overtime-by-userid-with-pagination/67?page=1&limit=10
      const url = `${process.env.REACT_APP_API_BASE_URL}/overtime/get-overtime-by-userid-with-pagination/${id}${
        queryString ? `?${queryString}` : ''
      }`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteOvertimeByID = createAsyncThunk('ot/deleteOvertimeByID', async(id, {rejectWithValue}) => {
    try {
        const {data} = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/overtime/delete-overtime/${id}`)
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateOvertimeByID = createAsyncThunk('ot/deleteOvertimeByID', async(ot, {rejectWithValue}) => {
    try {
        const {id, ...rest} = ot;

        const {data} = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/overtime/update-overtime-by-id/${id}`, rest)
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const overtimeSlice = createSlice({
    name: 'overtime',
    initialState: {
        _postOt: [],
        _getOtByUserId: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(postOvertime.pending, (state, _) => {
            state.loading = true
        })
        .addCase(postOvertime.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state._postOt = action.payload;
        })
        .addCase(postOvertime.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(getOvertimeByUserId.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getOvertimeByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state._getOtByUserId = action.payload;
        })
        .addCase(getOvertimeByUserId.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
})

export default overtimeSlice;