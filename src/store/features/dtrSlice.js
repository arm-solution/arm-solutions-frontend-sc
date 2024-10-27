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

});

export const postDtr = createAsyncThunk('dtr/postDtr', async(dtr, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/dtr/add-dtr`, dtr);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getDtrById = createAsyncThunk('dtr/getDtrById', async(id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const updateDtrById = createAsyncThunk('dtr/updateDtr', async(dtr, { rejectWithValue}) => {

    try {
        if(dtr) {
            const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/dtr/update-dtr/${dtr.id}`, { time_out: dtr.time_out });
            return data;
        }
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

})

const dtrSlice = createSlice({
    name: 'dtr',
    initialState:{
        dtr: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false; // Reset the success state
        }
    },
    extraReducers(builder){
        builder
        .addCase(getDtr.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getDtr.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.dtr = action.payload;
        })
        .addCase(getDtr.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(getDtrById.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getDtrById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.dtr = action.payload;
        })
        .addCase(getDtrById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(postDtr.pending, (state, _) => {
            state.loading = true
        })
        .addCase(postDtr.fulfilled, (state, action) => {

            const { success } = action.payload; 

            state.loading = false;
            state.isSuccess = success;
        })
        .addCase(postDtr.rejected, (state, action) => {
            const { message } = action.payload; 
            state.isSuccess = false;
            state.loading = false;
            state.message = message;
            // state.message = action.payload
        })
        .addCase(updateDtrById.pending, (state, _) => {
            state.loading = true
        })
        .addCase(updateDtrById.fulfilled, (state, action) => {
            // const { success } = action.payload; 

            state.loading = false;
            state.isSuccess = true;
        })
        .addCase(updateDtrById.rejected, (state, action) => {
            const { message } = action.payload; 
            state.isSuccess = false;
            state.loading = false;
            state.message = message;
            // state.message = action.payload
        })
    }
})


export const { resetSuccess } = dtrSlice.actions;
export default dtrSlice;