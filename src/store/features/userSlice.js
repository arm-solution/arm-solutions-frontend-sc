import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../customs/global/manageLocalStorage';
import axios from 'axios';
import { dateFormatted } from '../../customs/global/manageDates';

export const getUser = createAsyncThunk('user/getAllUser', async (_, { rejectWithValue }) => {
    try {        
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return data;
        
    } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addUser = createAsyncThunk('user/AddEmployee',  async (employeeData, { rejectWithValue }) => {

    try {

        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/employees/add-user`, employeeData);
        
        return data;
        
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

        console.log("datasjfhdsf", data);
        return data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async(user, { rejectWithValue }) => {
    try {
        if(user.id) {
            // removing id from user 
            const { id, fullname, created, start_date,  ...rest } = user;
            const {data} = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/employees/update-user/${id}`, {...rest, birthday: dateFormatted(rest.birthday)});
        
            return data;
        } else {
            return rejectWithValue({ error: "No ID selected"});
        }
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, {rejectWithValue}) => {
    try {

        if(id) {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/employees/delete-user/${id}`);

            return { ...data, empId: id };
        } else {
            return rejectWithValue({ error: 'No id identified' })
        }
        
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})


export const changePassword = createAsyncThunk('update/userPassword', async ( userInformation, {rejectWithValue}) => {
    try {
        if(userInformation) {
            const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/employees/update-password`, userInformation);

            return data; 
        }
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})

export const forgotPasswordRequest = createAsyncThunk('user/forgotPassword', async (userCred, {rejectWithValue}) => {
    try {
        if(userCred) {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees/forgot-password`, { 
                params: userCred 
            });
        
            return data;
        }
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message); 
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        userById: [],
        isSuccess: false,
        loading: false,
        message: ''
    },
    reducers: {
        clearMessage(state) {
            state.message = '';
        }
    },
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
            state.userById = action.payload

        })
        .addCase(getUserById.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })

        .addCase(deleteUser.pending, (state, action) =>{
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isSuccess = true;

            // this is for removing in the table instantly
            state.data = state.data.filter(user => user.id !== action.payload.empId);

        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isSuccess = false;
            state.loading = false;
            state.message = action.payload
        })
        .addCase(forgotPasswordRequest.pending, (state, _) =>{
            state.loading = true;
        })
        .addCase(forgotPasswordRequest.fulfilled, (state, action) => {

            const { message, success} = action.payload;

            state.loading = false;
            state.isSuccess = success;  
            state.message = message;

        })
        .addCase(forgotPasswordRequest.rejected, (state, action) => {
            const { message, success } = action.payload;

            state.loading = false;
            state.isSuccess = success;  
            state.message = message;

        })
        // .addCase(changePassword.pending, (state, _) => {
        //     state.loading = true;
        // })
        // .addCase(changePassword.fulfilled, (state, action) => {
        //     state.isSuccess = true;
        //     state.message = action.payload.message;
        // })
        // .addCase(changePassword.rejected, (state, action) => {
        //     state.isSuccess = false;
        //     state.message = action.payload.message
        // })

    }
});

export const { clearMessage } = userSlice.actions;

export default userSlice;