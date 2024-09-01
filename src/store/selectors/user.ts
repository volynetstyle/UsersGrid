import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { applySearchQuery } from "../helpers/user";

// Selector for filtering users
export const selectFilteredUsers = createSelector(
  [(state: RootState) => state.users.users, (state: RootState) => state.users.searchQuery],
  (users, searchQuery) => applySearchQuery(users, searchQuery)
);

export const selectFoundedCount = createSelector(
  [(state: RootState) => state.users.filteredUsers],
  (users) => users.length
)