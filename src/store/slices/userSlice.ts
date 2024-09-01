import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types';
import { applySearchQuery } from '../helpers/user';
import { fetchUsers } from '../actions/user';

const initialState: UserState = {
  loading: false,
  users: [],
  filteredUsers: [],
  searchQuery: '',
  error: undefined,
};


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
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = applySearchQuery(action.payload, state.searchQuery);
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});


export const { setSearchQuery, resetSearchQuery } = userSlice.actions;
export default userSlice.reducer;
