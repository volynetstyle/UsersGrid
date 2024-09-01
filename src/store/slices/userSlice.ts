import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserState, User } from '../types';
import { applySearchQuery } from '../helpers/user';

const initialState: UserState = {
  loading: false,
  users: [],
  filteredUsers: [],
  searchQuery: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data as User[];
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredUsers = applySearchQuery(state.users, action.payload);
    },
    resetSearchQuery: (state) => {
      state.searchQuery = '';
      state.filteredUsers = state.users;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
      state.filteredUsers = applySearchQuery(action.payload, state.searchQuery);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || 'Failed to fetch users';
    });
  },
});

export const { setSearchQuery, resetSearchQuery } = userSlice.actions;
export default userSlice.reducer;
