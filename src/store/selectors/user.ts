import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { applySearchQuery } from "../helpers/user";

export const selectUserState = (state: RootState) => state.users;
export const selectSearchQuery = (state: RootState) => state.users.searchQuery;

export const selectUsers = createSelector(
  [selectUserState],
  (userState) => userState.users
);

export const selectFilteredUsers = createSelector(
  [selectUsers, selectSearchQuery],
  (users, searchQuery) => applySearchQuery(users, searchQuery)
);

export const selectFoundedCount = createSelector(
  [selectFilteredUsers],
  (filteredUsers) => filteredUsers.length
);