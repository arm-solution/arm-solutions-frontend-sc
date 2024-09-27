import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const provinceSlice = createSlice({
    name: 'client',
    initialState: {
        provinces: [],
        cities: [],
        barangays: [],
        isSuccess: false,
        loading: true,
        message: ''
    },
    reducers: {
        // Actions for state updates
    fetchProvinceRequest(state) {
        state.loading = true;
        state.isSuccess = false;
        state.message = '';
      },
    fetchProvinceSuccess(state, action) {
        state.loading = false;
        state.isSuccess = true;
        state.provinces = action.payload;
        state.message = 'Clients fetched successfully!';
      },
    fetchProvinceFailure(state, action) {
        state.loading = false;
        state.isSuccess = false;
        state.provinces = [];
        state.message = action.payload;
      },
    fetchCitiesRequest(state) {
        state.loading = true;
        state.isSuccess = false;
        state.message = '';
      },
    fetchCitiesSuccess(state, action) {
        state.loading = false;
        state.isSuccess = true;
        state.cities = action.payload;
        state.message = 'Clients fetched successfully!';
      },
    fetchCitiesFailure(state, action) {
        state.loading = false;
        state.isSuccess = false;
        state.cities = [];
        state.message = action.payload;
      },
    fetchBarangayRequest(state) {
        state.loading = true;
        state.isSuccess = false;
        state.message = '';
      },
    fetchBarangaySuccess(state, action) {
        state.loading = false;
        state.isSuccess = true;
        state.barangays = action.payload;
        state.message = 'Clients fetched successfully!';
      },
    fetchBarangayFailure(state, action) {
        state.loading = false;
        state.isSuccess = false;
        state.barangays = [];
        state.message = action.payload;
      },
    },
});

export const {
    fetchProvinceRequest,
    fetchProvinceSuccess,
    fetchProvinceFailure,
    fetchCitiesRequest,
    fetchCitiesSuccess,
    fetchCitiesFailure,
    fetchBarangayRequest,
    fetchBarangaySuccess,
    fetchBarangayFailure
} = provinceSlice.actions

export const fetchAllProvince = () => async (dispatch) => {
    dispatch(fetchProvinceRequest());

    try {
        const { data } = await axios.get('https://psgc.cloud/api/provinces');
        dispatch(fetchProvinceSuccess(data));
    } catch (error) {
        dispatch(fetchProvinceFailure(error.message));
    }
}

export const fetchAllCities = (provinceCode) => async (dispatch) => {
    dispatch(fetchCitiesRequest());
    
    if(provinceCode === '') {
        return;
    }

    try {
        const [cityResponse, municipalityResponse] = await Promise.all([
          axios.get(`https://psgc.cloud/api/provinces/${provinceCode}/cities`),
          axios.get(`https://psgc.cloud/api/provinces/${provinceCode}/municipalities`),
        ]);

        const cityData = cityResponse.data;
        const municipalityData = municipalityResponse.data;

        dispatch(fetchCitiesSuccess([...cityData, ...municipalityData]))
    
    } catch (error) {
        dispatch(fetchCitiesFailure());
    }

}

export const fetchAllBarangays = (cityCode) => async (dispatch) => {
   dispatch(fetchBarangayRequest());

   if(cityCode === '') {
    return;
   }

   try {
     const { data } = await axios.get(`https://psgc.cloud/api/cities-municipalities/${cityCode}/barangays`);

     dispatch(fetchBarangaySuccess(data))
   } catch (error) {
     dispatch(fetchBarangayFailure());
   }
}


export default provinceSlice;