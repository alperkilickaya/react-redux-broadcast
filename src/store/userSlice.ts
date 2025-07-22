// store/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      console.log("setUser", action.payload);
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
    invalidateAccessToken(state) {
      return { ...state, accessToken: null };
    },
  },
});

export const { setUser, clearUser, invalidateAccessToken } = userSlice.actions;
export default userSlice.reducer;
