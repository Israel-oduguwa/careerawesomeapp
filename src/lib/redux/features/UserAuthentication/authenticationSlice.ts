// this is for the user signin and signup

import { createAppSlice } from "../../createAppSlice";
import type { AppThunk } from "../../store";
import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { loginAPI, getUserDataAPI } from "./authenticationAPI";
import { LogOutFunction } from "@/lib/auth";

export interface authenticationSlice {
  authenticated: boolean;
  loading: boolean;
  credentials: any;
  status: "idle" | "loading" | "failed";
  loginButtonLoad:boolean;
  error: string | null; // New field for storing error messages
}

const initialState: authenticationSlice = {
  authenticated: false,
  loading: true,
  loginButtonLoad:false,
  credentials: {},
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "authentication/login",
  async (payload: object, { rejectWithValue }) => {
    try {
      const response = await loginAPI(payload);
      return response;
    } catch (error: any) {
      // Return the error message
      return rejectWithValue(
        "We couldn’t find an account matching the username and password you entered. Please check your username and password and try again."
      );
    }
  }
);

export const getUserData = createAsyncThunk(
  "authentication/get_user_data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserDataAPI();
      return response;
    } catch (error: any) {
      // Return the error message
      return rejectWithValue(error.message);
    }
  }
);

// If you are not using async thunks you can use the standalone `createSlice`.
export const authenticationSlice = createAppSlice({
  name: "authentication",
  initialState,
  reducers: {
    logoutUser: (state) => {
      LogOutFunction();
      state.authenticated = false;
      state.error = null; // Clear error when logging out
    },
    clearError: (state) => {
      state.error = null; // Clear error manually
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginButtonLoad = true;
      state.error = null; // Reset error state
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginButtonLoad= false;
      state.loading= false;
      state.authenticated = true;
      state.credentials = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginButtonLoad = false;
      state.error = action.payload as string; // Set error message
    });
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = null; // Reset error state
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.credentials = action.payload;
      state.authenticated = true;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Set error message
    });
  },
  selectors: {
    selectUserData: (state) => state,
  },
});
// Action creators are generated for each case reducer function.

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserData } = authenticationSlice.selectors;
export const { logoutUser } = authenticationSlice.actions;

// reducers: (create) => ({
//   // Use the `PayloadAction` type to declare the contents of `action.payload`
//   incrementByAmount: create.reducer(
//     (state, action: PayloadAction<number>) => {
//       // state.value.name = action.payload;
//     },
//   ),
//   // The function below is called a thunk and allows us to perform async logic. It
//   // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
//   // will call the thunk with the `dispatch` function as the first argument. Async
//   // code can then be executed and other actions can be dispatched. Thunks are
//   // typically used to make async requests.
//   // loginAsync: create.asyncThunk(
//   //   async (payload: object) => {
//   //     const response = await loginUser(payload);
//   //     // The value we return becomes the `fulfilled` action payload
//   //     // console.log(response)
//   //     return response;
//   //   },
//   //   {
//   //     pending: (state) => {
//   //       state.status = "loading";

//   //     },
//   //     fulfilled: (state, action) => {
//   //       state.status = "idle";
//   //       console.log(state, action)
//   //       state.credentials= action.payload
//   //     },
//   //     rejected: (state) => {
//   //       state.status = "failed";
//   //     },
//   //   },
//   // ),
//   // extra

// }),
