import { createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '@services/cart.service';

export const getCartByUser = createAsyncThunk(
  'cart/getCartByUser',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartByUser(accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ accessToken, data }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(accessToken, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ accessToken, data }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateQuantity(accessToken, data);
      return {
        data: response,
        itemId: data.productId,
        quantity: data.quantity,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'cart/deleteItem',
  async ({ accessToken, id }, { rejectWithValue }) => {
    try {
      const response = await cartService.deleteItem(accessToken, id);
      return {
        data: response,
        _id: id,
      }
        ;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAll = createAsyncThunk(
  'cart/deleteAll',
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await cartService.deleteAll(accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);