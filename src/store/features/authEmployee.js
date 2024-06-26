import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const loginEmployee = createAsyncThunk('employee/login', async ({ employee_no, employee_password }, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:5000/employees/login', { employee_no, employee_password });
        return res.data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});


const employeeAuthSlice = createSlice({
    name: 'employeeLogin',
    initialState: {
        data: [],
        token: '',
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder 
        .addCase(loginEmployee.pending, (state, action) => {
            state.loading = true;
            state.isSuccess = false;
        })
        .addCase(loginEmployee.fulfilled, (state, action) => {

            const { data, token } = action.payload; 
            state.loading = false;
            state.isSuccess = true;

            state.token = token
            state.data = data

            // Store token and user data in localStorage
        localStorage.setItem('authEmployee', JSON.stringify({ token: token, data: data }));
        })
        .addCase(loginEmployee.rejected, (state, action) => {
            const { message } = action.payload; 
            state.loading = false;
            state.isSuccess = false;

            state.message = message || 'Login failed';
        })
    }

});

export default employeeAuthSlice;

