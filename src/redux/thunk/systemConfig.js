import { createAsyncThunk } from '@reduxjs/toolkit';
import systemConfigService from '@services/systemConfig.service';

export const getCurrentConfigs = createAsyncThunk(
  'systemConfigs.getCurrentConfigs',
  async (_, thunkAPI) => {
    try {
      const response = await systemConfigService.getCurrentConfigs();

      console.log(response);

      //   if (response.error) {
      //     throw new Error(response.error);
      //   }

      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(error);
    }
  }
);
