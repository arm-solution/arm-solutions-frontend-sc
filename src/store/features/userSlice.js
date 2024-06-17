import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_USER_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUser = createAsyncThunk('user/getAllUser', async (arg, { rejectWithValue }) => {
    
    try {
       const { data } = await axios.get(GET_USER_URL);
       return data;
    } catch (error) {
        rejectWithValue(error.response.data);
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

    }
});

export default userSlice;