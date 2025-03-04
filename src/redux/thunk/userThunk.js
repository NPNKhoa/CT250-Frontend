// userThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@services/user.service';

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId, thunkAPI) => {
    try {
      // Gọi API để lấy thông tin người dùng theo userId
      const data = await userService.getUserById(userId);
      return data;
    } catch (error) {
      // Trả về lỗi nếu có, sử dụng rejectWithValue để giữ thông tin lỗi
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  'users/getLoggedInUser',
  async (accessToken, thunkAPI) => {
    try {
      // Gọi API để lấy thông tin người dùng đăng nhập hiện tại dựa trên accessToken
      const response = await userService.getLoggedInUser(accessToken);
      return response.data;
    } catch (error) {
      // Trả về lỗi nếu có, sử dụng rejectWithValue để giữ thông tin lỗi
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const updateUserInfoThunk = createAsyncThunk(
  'users/updateUserInfo',
  async ({ updatedData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUserInfo(
        updatedData,
        accessToken
      );
      return response;
    } catch (error) {
      // Sử dụng rejectWithValue để gửi lỗi tùy chỉnh đến reducer
      return rejectWithValue(error.message);
    }
  }
);

export const updatePasswordThunk = createAsyncThunk(
  'users/updatePassword',
  async ({ updatedData, accessToken }, { rejectWithValue }) => {
    try {
      const response = await userService.updatePassword(
        updatedData,
        accessToken
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk để thay đổi avatar
export const changeAvatarThunk = createAsyncThunk(
  'users/changeAvatar',
  async ({ avatarFile, accessToken }, { rejectWithValue }) => {
    try {
      const response = await userService.changeAvatar(avatarFile, accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Error changing avatar'
      );
    }
  }
);
