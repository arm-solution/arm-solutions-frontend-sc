import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getAllUser', async (_, { rejectWithValue }) => {
    try {
        const tokenString = localStorage.getItem('token');
      
        if (!tokenString) {
            throw new Error('No token found');
        }

        const token = tokenString.replace(/^"(.*)"$/, '$1');
        
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // console.log(data);
        return data;
        
    } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addUser = createAsyncThunk('user/AddEmployee',  async (employeeData, { rejectWithValue }) => {

    try {

        const employee = [...employeeData];

        const tokenString = localStorage.getItem('token');

        if (!tokenString) {
            throw new Error('No token found');
        }

        const token = tokenString.replace(/^"(.*)"$/, '$1');
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

})

export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue }) => {
    
}) 



const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getUser.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload

        })
        .addCase(getUser.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })

    }
});

export default userSlice;