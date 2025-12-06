import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserProfile, LoginResponse } from "./types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      }>
    ) => {
      const { accessToken, refreshToken, expiresIn } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresAt = Date.now() + expiresIn * 1000; // Convert to milliseconds
      state.isAuthenticated = true;
    },

    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: UserProfile;
        tokens: LoginResponse;
      }>
    ) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.accessToken = tokens.access_token;
      state.refreshToken = tokens.refresh_token;
      state.expiresAt = Date.now() + tokens.expires_in * 1000;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.expiresAt = null;
    },

    updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  setLoading,
  setTokens,
  setUser,
  loginSuccess,
  logout,
  updateUser,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;
