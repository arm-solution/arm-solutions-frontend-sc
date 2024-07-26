import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../customs/global/manageLocalStorage';
import axios from 'axios';

export const getUser = createAsyncThunk('user/getAllUser', async (_, { rejectWithValue }) => {
    try {        
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
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
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }

})

export const getUserById = createAsyncThunk('user/getUserById', async (id, { rejectWithValue, getState }) => {
    
    try {

        // console.log(`${process.env.REACT_APP_API_BASE_URL}/employees/get-user-by-id/${parseInt(id)}`);
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees/get-user-by-id/${parseInt(id)}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
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
        .addCase(getUserById.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            state.data = action.payload

        })
        .addCase(getUserById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })

    }
});

export default userSlice;