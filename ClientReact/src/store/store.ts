import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from './reducers/gameSlice'
import { gameAPI } from "../core/API/gameService";
import { authApi } from "../core/API/authService";
import { authSlice } from "./reducers/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const combineReducer = combineReducers({
  gameReducer,
  [gameAPI.reducerPath]: gameAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [authSlice.name]: authSlice.reducer
});

export const setupStore = configureStore({
  reducer: combineReducer,
  middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware().concat(gameAPI.middleware)
        
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type GetRootState = typeof setupStore.getState;