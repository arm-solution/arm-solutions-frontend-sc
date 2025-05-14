import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../customs/global/manageLocalStorage';
import axios from 'axios';

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
        
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/dtr/add-dtr`, dtr, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const getDtrById = createAsyncThunk('dtr/getDtrById', async({ id, from, to }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/${id}`, {
            params: {
                ...(from && { from }),
                ...(to && { to }),
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const updateDtrById = createAsyncThunk('dtr/updateDtr', async(dtr, { rejectWithValue}) => {

    try {

        if(dtr) {
            const {id, shift_date, ...rest} = dtr;
            const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/dtr/update-dtr/${id}`, rest);
            return data;
        }
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

})

export const getWeeklyDtr = createAsyncThunk('dtr/getWeeklyDtr', async(user_id, {rejectWithValue}) =>{

    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/weekly-dtr/${user_id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const getCurrentDtr = createAsyncThunk('dtr/getCurrentDtr', async(user_id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/get-current-dtr/${user_id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const getPendingDtrUsers = createAsyncThunk('dtr/getPendingUserDtr', async(_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/pending-dtr/pending-by-user`);
        return data; 
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateMultipleDtrStatus = createAsyncThunk('dtr/updateMultipleDtrStatus', async(status, {rejectWithValue}) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/dtr/update-multiple-dtr`, status);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const getAllDtrWithDateRange = createAsyncThunk('dtr/getAllDtrWithDateRange', async({userId, dtrParams}, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dtr/get-dtr-range/${userId}`, {
            params: dtrParams
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const dtrSlice = createSlice({
    name: 'dtr',
    initialState:{
        allDtr: [],
        weeklyDtr: [],
        currentDtr: [],
        dtrById: [],
        getPendingUserDtr: [],
        updateDtrStatus: [],
        dtrWithDateRange: [],
        isSuccess: false,
        loading: false,
        dtrPostLoading: false,
        message: ''
    },
    reducers: {
        resetSuccess(state) {
            state.isSuccess = false; // Reset the success state
        },
        resetCurrentDtr(state) {
            state.currentDtr = [];
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
            state.dtrById = action.payload;
        })
        .addCase(getDtrById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(postDtr.pending, (state, _) => {
            state.dtrPostLoading = true
            console.log("pending")
        })
        .addCase(postDtr.fulfilled, (state, action) => {

            const { success } = action.payload; 

            state.dtrPostLoading = false;
            console.log("fullfiled")
            state.isSuccess = success;
        })
        .addCase(postDtr.rejected, (state, action) => {
            const { message } = action.payload; 
            state.isSuccess = false;
            state.dtrPostLoading = false;
            state.message = message;
            console.log("rejected")
            // state.message = action.payload
        })

        .addCase(getCurrentDtr.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getCurrentDtr.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.currentDtr = action.payload
        })
        .addCase(getCurrentDtr.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "Un able to fetch the current dtr";
        })
        .addCase(getPendingDtrUsers.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getPendingDtrUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.getPendingUserDtr = action.payload
        })
        .addCase(getPendingDtrUsers.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "Un able to fetch the current dtr";
        })
        .addCase(getWeeklyDtr.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getWeeklyDtr.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.weeklyDtr = action.payload
        })
        .addCase(getWeeklyDtr.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "Un able to fetch the current dtr";
        })
        .addCase(getAllDtrWithDateRange.pending, (state, _) => {
            state.loading = true
        })
        .addCase(getAllDtrWithDateRange.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.dtrWithDateRange = action.payload
        })
        .addCase(getAllDtrWithDateRange.rejected, (state, _) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = "Un able to fetch the current dtr";
        })
    }
})


export const { resetSuccess, resetCurrentDtr } = dtrSlice.actions;
export default dtrSlice;