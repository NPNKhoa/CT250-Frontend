// userThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@services/user.service';

// Thunk to get user by ID
export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId, thunkAPI) => {
    try {
      const data = await userService.getUserById(userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to get the logged-in user's data
export const getLoggedInUser = createAsyncThunk(
  'users/getLoggedInUser',
  async (_, thunkAPI) => {
    try {
      const data = await userService.getLoggedInUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
