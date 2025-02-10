import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getManPower = createAsyncThunk('dashboard/getManPower', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/total-manpower`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const getTotalSales = createAsyncThunk(
    'dashboard/getTotalSales',
    async (dateRange, { rejectWithValue }) => {
      try {
        let url = `${process.env.REACT_APP_API_BASE_URL}/dashboard/total-sales`;
  
        if (dateRange?.startDate && dateRange?.endDate) {
          url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
        }
  
        const { data } = await axios.get(url);
        return data;
      } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
  


export const getTotalProjects = createAsyncThunk('dashboard/getTotalProjects', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/total-projects`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})



export const getOngoingProjects = createAsyncThunk('dashboard/getOngoingProjects', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/ongoing-projects`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


export const getTotalInventory = createAsyncThunk('dashboard/getTotalInventory', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/total-inventory`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


export const getTopSales = createAsyncThunk('dashboard/getTopSales', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/top-sales`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


export const getDueProjects = createAsyncThunk('dashboard/getDueProjects', async (_, {rejectWithValue}) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard/due-projects`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        manpower: [],
        totalsales: [],
        totalprojects: [],
        ongoingprojects: [],
        totalinventory: [],
        dueprojects: [],
        topsales: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getManPower.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getManPower.fulfilled, (state, action) => {
            state.loading = false;
            state.manpower = action.payload;
            state.isSuccess = true;
        })
        .addCase(getManPower.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getTotalSales.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getTotalSales.fulfilled, (state, action) => {
            state.loading = false;
            state.totalsales = action.payload;
            state.isSuccess = true;
        })
        .addCase(getTotalSales.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getTotalProjects.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getTotalProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.totalprojects = action.payload;
            state.isSuccess = true;
        })
        .addCase(getTotalProjects.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getOngoingProjects.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getOngoingProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.ongoingprojects = action.payload;
            state.isSuccess = true;
        })
        .addCase(getOngoingProjects.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getTotalInventory.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getTotalInventory.fulfilled, (state, action) => {
            state.loading = false;
            state.totalinventory = action.payload;
            state.isSuccess = true;
        })
        .addCase(getTotalInventory.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getTopSales.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getTopSales.fulfilled, (state, action) => {
            state.loading = false;
            state.topsales = action.payload;
            state.isSuccess = true;
        })
        .addCase(getTopSales.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })
        .addCase(getDueProjects.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getDueProjects.fulfilled, (state, action) => {
            state.loading = false;
            state.dueprojects = action.payload;
            state.isSuccess = true;
        })
        .addCase(getDueProjects.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = 'Error fetching api';
        })

    }
})

export default dashboardSlice;