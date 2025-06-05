import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
 
const fetchData = async (endpoint, params, rejectWithValue) => {
    try {
        let url = `${API_BASE_URL}/dashboard/${endpoint}`;
        if (params) {
            const queryParams = new URLSearchParams(params).toString();
            url += `?${queryParams}`;
        }
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
};
 
export const getManPower = createAsyncThunk('dashboard/getManPower', async (dateRange, { rejectWithValue }) => fetchData('total-manpower', dateRange, rejectWithValue));
export const getTotalSales = createAsyncThunk('dashboard/getTotalSales', async (dateRange, { rejectWithValue }) => fetchData('total-sales', dateRange, rejectWithValue));
export const getTotalProjects = createAsyncThunk('dashboard/getTotalProjects', async (dateRange, { rejectWithValue }) => fetchData('total-projects', dateRange, rejectWithValue));
export const getOngoingProjects = createAsyncThunk('dashboard/getOngoingProjects', async (dateRange, { rejectWithValue }) => fetchData('ongoing-projects', dateRange, rejectWithValue));
export const getTotalInventory = createAsyncThunk('dashboard/getTotalInventory', async (dateRange, { rejectWithValue }) => fetchData('total-inventory', dateRange, rejectWithValue));
export const getTopSales = createAsyncThunk('dashboard/getTopSales', async (dateRange, { rejectWithValue }) => fetchData('top-sales', dateRange, rejectWithValue));
export const getDueProjects = createAsyncThunk('dashboard/getDueProjects', async (dateRange, { rejectWithValue }) => fetchData('due-projects', dateRange, rejectWithValue));
 
const initialState = {
    manpower: [],
    totalsales: [],
    totalprojects: [],
    ongoingprojects: [],
    totalinventory: [],
    topsales: [],
    dueprojects: [],
    isSuccess: false,
    loading: false,
    message: ''
};
 
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const addAsyncCases = (thunk, key) => {
            builder
                .addCase(thunk.pending, (state) => {
                    state.loading = true;
                })
                .addCase(thunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state[key] = action.payload;
                    state.isSuccess = true;
                })
                .addCase(thunk.rejected, (state, action) => {
                    state.loading = false;
                    state.isSuccess = false;
                    state.message = 'Error fetching API';
                });
        };
       
        addAsyncCases(getManPower, 'manpower');
        addAsyncCases(getTotalSales, 'totalsales');
        addAsyncCases(getTotalProjects, 'totalprojects');
        addAsyncCases(getOngoingProjects, 'ongoingprojects');
        addAsyncCases(getTotalInventory, 'totalinventory');
        addAsyncCases(getTopSales, 'topsales');
        addAsyncCases(getDueProjects, 'dueprojects');
    }
});
 
export default dashboardSlice;