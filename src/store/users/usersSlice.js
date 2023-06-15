import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://randomuser.me/api/?results=5';
const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

export const getUsers = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      return fetch(url)
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
    } catch (error) {
      return thunkAPI.rejectWithValue('Not Working');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = [...state.users, action.payload];
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = 'PROBLEM';
    });
  },
});

export default usersSlice.reducer;
