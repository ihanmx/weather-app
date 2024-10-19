import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherAPI/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/24.774265,46.738586?key=DHE4WQ4E88HXMKH9YKTT4FT7E"
    );

    const num = Math.round((response.data.currentConditions.temp - 32) / 1.8); // Convert to Celsius if needed
    const description = response.data.currentConditions.conditions; // Fix description key
    const min = response.data.days[0].tempmin;
    const max = response.data.days[0].tempmax;

    return { num, description, min, max };
  }
);

export const weatherAPISlice = createSlice({
  name: "weatherAPI",
  initialState: { weather: {}, status: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default weatherAPISlice.reducer;
