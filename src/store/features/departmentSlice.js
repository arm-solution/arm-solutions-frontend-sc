import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getDepartment = createAsyncThunk('department/getAllDepartment', async (_, { rejectWithValue }) => {
    try {
  
       const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/departments`);

       return data
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getDepartment.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(getDepartment.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload

        })
        .addCase(getDepartment.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
    }
});

export default departmentSlice;