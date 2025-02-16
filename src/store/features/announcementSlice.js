import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllAnnouncements = createAsyncThunk(
  "announcement/getAllAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/announcement`);
      console.log("API Response:", response.data); // Debugging response structure
      return Array.isArray(response.data) ? response.data : []; // Ensuring array format
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const deleteAnnouncement = createAsyncThunk('deleteAnnouncement', async(id, {rejectWithValue}) => {
  try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/announcement/delete-announcement/${id}`);

      return data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
})


const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    data: [], 
    isSuccess: false,
    loading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAnnouncements.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.data = action.payload; // Ensure payload is an array
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteAnnouncement.pending, (state, action) =>{
          state.loading = true;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
          state.loading = false;
          state.isSuccess = true;

      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
          state.isSuccess = false;
          state.loading = false;
          state.message = action.payload
      });
  },
});

export default announcementSlice;
