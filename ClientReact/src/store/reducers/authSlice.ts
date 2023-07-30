import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignInDTO } from "../../core/dto/signInDto";
import { RootState } from "../store";

interface AuthState {
  user: SignInDTO | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SignInDTO | null>) => {  //фунскция редьюсера, изменяющая состояние
      if (action.payload === null) {
        state.user = null;
        return;
      }

      state.user = {
        ...action.payload,
      };
    },
  },
});

export const selectUser = (state: RootState) => state.auth.user;

export const { setUser } = authSlice.actions;