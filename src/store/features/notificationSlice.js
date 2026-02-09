import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const addNotification = createAsyncThunk('add/notification', async(not, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notification/add`, not);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});


export const getNotification = createAsyncThunk('get/notification', async({page = 1, limit=5, userId}, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notification/${userId}`, {
            params: {page, limit}
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const updateNotification = createAsyncThunk('update/notification', async(not, {rejectWithValue}) => {
    try {
        const {user_id, created_at, ...rest} = not;
        if(!user_id) {
            console.error("No notifiaction id found");
            return;
        }

        const {data} = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/notification/update-notification/${user_id}`, rest);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const deleteNotification = createAsyncThunk('delete/notification', async(userId, {rejectWithValue}) => {
        try {
        if(!userId) {
            console.error("No notifiaction id found");
            return;
        }

        const {data} = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/notification/${userId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notByUserIdList: {
      total: 0,
      page: 1,
      limit: 10,
      not_read: 0,
      has_more: false,
      data: [],        
    },
    isSuccess: false,
    loading: true,
    message: "",
  },

  reducers: {
    // 🔥 USED BY WEBSOCKET
    pushNotification(state, action) {
    const notification = action.payload;

    console.log("payload", notification)

    // 🛡️ safety guard
    if (!notification || !notification.id) return;

    state.notByUserIdList.data.unshift(notification);
    state.notByUserIdList.total += 1;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(getNotification.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;

        // ✅ STORE FULL OBJECT (AS-IS FROM API)
        state.notByUserIdList = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
          not_read: action.payload.not_read,
          has_more: action.payload.has_more,
          data: Array.isArray(action.payload.data)
            ? action.payload.data
            : [],
        };
      })

      .addCase(getNotification.rejected, (state) => {
        state.isSuccess = false;
        state.loading = false;
        state.message = "Issue on payload api";
      });
  },
});

export const { pushNotification } = notificationSlice.actions;
export default notificationSlice;
