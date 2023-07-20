import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from './reducers/gameSlice'
import { gameAPI } from "../core/API/gameService";

const combineReducer = combineReducers({
  gameReducer,
  [gameAPI.reducerPath]: gameAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: combineReducer,
    middleware:(getDefaultMiddleware) => 
      getDefaultMiddleware().concat(gameAPI.middleware)
        
  }
)};

export type RootState = ReturnType<typeof combineReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']