import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserState {
  users: User[];
  filteredUsers: User[];
  filters: Omit<User, 'id'>;
  loading: boolean;
  error?: string
}

const initialState: UserState = {
  loading: false,
  users: [],
  filteredUsers: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: ''
  }
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data as User[];
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<UserState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      
      state.filteredUsers = state.users.filter(user => {
        return (
          user.name.toLowerCase().includes(state.filters.name.toLowerCase()) &&
          user.username.toLowerCase().includes(state.filters.username.toLowerCase()) &&
          user.email.toLowerCase().includes(state.filters.email.toLowerCase()) &&
          user.phone.toLowerCase().includes(state.filters.phone.toLowerCase())
        );
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
});

export const { setFilters } = userSlice.actions;
export const selectUsers = (state: RootState) => state.users
export default userSlice.reducer;
