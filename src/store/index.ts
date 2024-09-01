import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducer from './slices/userSlice';  
import { IS_DEVELOPMENT } from "../confitg";

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),  
  devTools: IS_DEVELOPMENT, 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
