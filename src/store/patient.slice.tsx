import { createSlice } from "@reduxjs/toolkit";

export type Patient = {
  address: string;
  allergicDetails: string;
  city: string;
  contactNumber: string;
  createdAt: string;
  dob: string;
  emergencyContact: string;
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyRelationship: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  medicalDetails: string;
  postcode: string;
  updatedAt: string;
};
export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients: [] as Array<Patient>,
  },
  reducers: {
    addPatients: (state, action) => {
      const patients = action.payload;
      state.patients = patients;
    },
  },
});

export const { addPatients } = patientSlice.actions;
export default patientSlice.reducer;

export const selectPatients = (state: any) => state.patients;
