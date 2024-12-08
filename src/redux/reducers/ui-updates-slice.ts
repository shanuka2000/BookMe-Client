import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiUpdatesState = {
  authUserType?: "passenger" | "driver" | "admin";
  errorMessage?: string;
};

const initialState: UiUpdatesState = {
  authUserType: "passenger",
  errorMessage: "",
};

const uiUpdatesSlice = createSlice({
  name: "uiUpdates",
  initialState,
  reducers: {
    setAuthUserType: (state, action: PayloadAction<UiUpdatesState>) => {
      state.authUserType = action.payload.authUserType;
    },
    setErrorMessage: (state, action: PayloadAction<UiUpdatesState>) => {
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setAuthUserType, setErrorMessage } = uiUpdatesSlice.actions;
export default uiUpdatesSlice.reducer;
