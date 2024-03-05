import { IUser } from "../../types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUserAuth {
  accessToken: string;
  user: IUser;
}
interface IFetch {
  user: IUser;
  variant: "signin" | "signup";
}
interface IUserSlice {
  isLoading: boolean;
  error: null | string;
  user: IUser | null;
}
const initialState: IUserSlice = {
  isLoading: false,
  error: "",
  user: null,
};

export const fetchAuth = createAsyncThunk(
  "auth/fetchLogin",
  async (payload: IFetch, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/${payload.variant}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.user),
      });

      if (!res.ok) {
        throw new Error("Ошибка");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(
        fetchAuth.fulfilled,
        (state, action: PayloadAction<IUserAuth>) => {
          state.isLoading = false;
          state.error = null;
          state.user = action.payload.user;
          localStorage.setItem("token", action.payload.accessToken);
        }
      ),
      builder.addCase(
        fetchAuth.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
