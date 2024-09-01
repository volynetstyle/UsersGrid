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
  searchQuery: string;
  loading: boolean;
  error?: string;
}
