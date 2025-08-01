import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const loginEmployee = createAsyncThunk('employee/login', async ({ employee_id, user_password }, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/employees/login`, { employee_id, user_password });
        return res.data;
      } catch (error) {
        // Log error details for better debugging
        return rejectWithValue(error.response?.data || 'An unexpected error occurred');
      }
    }
);


const employeeAuthSlice = createSlice({
  name: 'employeeLogin',
  initialState: {
    data: [],
    token: '',
    isSuccess: false,
    loading: false,
    message: ''
  },
  reducers: {
    clearLoginState: (state) => {
      state.isSuccess = false;
      state.loading = false;
      state.message = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginEmployee.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        const { data, token, success } = action.payload;
        if (success) {
          state.loading = false;
          state.isSuccess = true;
          state.token = token;
          state.data = data;

          localStorage.setItem('authEmployee', JSON.stringify({ data }));
          localStorage.setItem('token', JSON.stringify(token));
        }
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        const { message } = action.payload;
        state.loading = false;
        state.isSuccess = false;
        state.message = `Login failed - ${message}`;
      });
  },
});

export const { clearLoginState } = employeeAuthSlice.actions;
export default employeeAuthSlice;


