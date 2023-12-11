import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import user from "../../api/user.service";

const initialState = {
  medications: [],
  doctors: []
};

const infoSlice = createSlice({
  name: "Info",
  initialState,
  reducers: {
    set_medications(state, action) {
      state.medications = action.payload;
    },
    set_doctors(state, action) {
      state.doctors = action.payload;
    }
  }, extraReducers: (builder) => {
    builder.addCase(getMedicationsThunk.fulfilled, (state, action) => {
      state.medications = action.payload;
    });
    builder.addCase(getDoctorsThunk.fulfilled, (state, action) => {
      state.doctors = action.payload;
    });
  }
});

export const getMedicationsThunk = createAsyncThunk(
  "info/setMedications",
  async () => {
    try {
      const res = await user.getMedications();
      return res;
    } catch (err) {
      console.log(err, "An error occurred");
    }
  }
);

export const getDoctorsThunk = createAsyncThunk(
  "info/setDoctors",
  async () => {
    try {
      const res = await user.getDoctors();
      console.log("RES, ", res);
      return res;
    } catch (err) {
      console.log(err, "An error occurred");
    }
  }
);

export const {} = infoSlice.actions;
export default infoSlice.reducer;
