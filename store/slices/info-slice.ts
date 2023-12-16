import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import user from "../../api/user.service";

// Initial state for various information
const initialState = {
  medications: [],
  doctors: [],
  patients: [],
  userInfo: {},
  appointments: []
};

// Slice for managing different types of information
const infoSlice = createSlice({
  name: "Info",
  initialState,
  reducers: {
    // Reducers to update specific slices of state
    set_medications(state, action) {
      state.medications = action.payload;
    },
    set_doctors(state, action) {
      state.doctors = action.payload;
    },
    set_patients(state, action) {
      state.patients = action.payload;
    },
    set_user_info(state, action) {
      state.userInfo = action.payload;
    },
    set_appointment(state, action) {
      state.userInfo = action.payload;
    }
  },
  // Extra reducers to handle asynchronous API calls using createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(getMedicationsThunk.fulfilled, (state, action) => {
      state.medications = action.payload;
    });
    builder.addCase(getDoctorsThunk.fulfilled, (state, action) => {
      state.doctors = action.payload;
    });
    builder.addCase(getPatientsThunk.fulfilled, (state, action) => {
      state.patients = action.payload;
    });
    builder.addCase(getAppointmentsThunk.fulfilled, (state, action) => {
      state.appointments = action.payload;
    });
  }
});

// Thunks for fetching information asynchronously and updating the state
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

// ... (similar thunks for appointments, doctors, and patients)

export const getAppointmentsThunk = createAsyncThunk(
  "info/setAppointments",
  async (id: string) => {
    try {
      console.log("Id, ", id);
      const res = await user.getAppointmentsByDoctorId(id);
      return res.appointments;
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

export const getPatientsThunk = createAsyncThunk(
  "info/setPatients",
  async () => {
    try {
      const res = await user.getPatients();
      return res;
    } catch (err) {
      console.log(err, "An error occurred");
    }
  }
);

export const {set_user_info} = infoSlice.actions;
export default infoSlice.reducer;
