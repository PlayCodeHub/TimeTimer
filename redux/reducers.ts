import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Define a type for the slice state
interface MainState {
  clockCenterCoordinate: ClockCoordinates;
  panAngle?: number;
}

interface ClockCoordinates {
  x: number;
  y: number;
}

// Define the initial state using that type
const initialState: MainState = {
  clockCenterCoordinate: {
    x: 0,
    y: 0
  },
  panAngle: undefined
};

export const mainSlice = createSlice({
  name: "main",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setClockCoordinates: (state, action: PayloadAction<ClockCoordinates>) => {
      state.clockCenterCoordinate.x = action.payload.x;
      state.clockCenterCoordinate.y = action.payload.y;
    },
    setPanAngle: (state, action: PayloadAction<number>) => {
      state.panAngle = action.payload;
    }
  }
});

export const { setClockCoordinates, setPanAngle } = mainSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectClockCoordinates = (state: RootState) =>
  state.main.clockCenterCoordinate;

export const selectPanAngle = (state: RootState) => state.main.panAngle;

export default mainSlice.reducer;
