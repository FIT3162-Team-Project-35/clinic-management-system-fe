import { createSlice } from "@reduxjs/toolkit";
import { Encounter } from "../components/EncounterTable";

export const encounterSlice = createSlice({
  name: "encounter",
  initialState: {
    encounters: [] as Array<Encounter>,
  },
  reducers: {
    addEncounters: (state, action) => {
      const encounters = action.payload;
      state.encounters = encounters;
    },
  },
});

export const { addEncounters } = encounterSlice.actions;
export default encounterSlice.reducer;

export const selectEncounters = (state: any) => state.encounters;
