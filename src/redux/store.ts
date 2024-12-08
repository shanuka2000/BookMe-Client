import { configureStore } from "@reduxjs/toolkit";
import uiUpdatesReducer from "./reducers/ui-updates-slice";

const store = configureStore({
  reducer: {
    uiUpdates: uiUpdatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
