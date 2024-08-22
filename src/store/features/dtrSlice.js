import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../customs/global/manageLocalStorage';
import axios from 'axios';
import { dateFormatted } from '../../customs/global/manageDates';

export const getDtr = createAsyncThunk('dtr/getDtr', async(_, { rejectWithValue }) => {

    try {
        
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr`)

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

})

const dtrSlice = createSlice({
    name: 'dtr',
    initialState:{
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(getDtr.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getDtr.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.data = action.payload;
        })
        .addCase(getDtr.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
})

export default dtrSlice;