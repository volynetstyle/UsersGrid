import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { applySearchQuery } from "../helpers/user";

// Selector for filtering users
export const selectFilteredUsers = createSelector(
  [(state: RootState) => state.users.users, (state: RootState) => state.users.searchQuery],
  (users, searchQuery) => applySearchQuery(users, searchQuery)
);
