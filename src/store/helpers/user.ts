import { User } from "../types";

export const applySearchQuery = (users: User[], searchQuery: string) => {
  const normalizedSearchQuery = searchQuery.toLowerCase();
  
  const searchTerms = normalizedSearchQuery.split(/\s+/).filter(term => term.length > 0);

  return users.filter(user => {
    const fields = [
      user.name.toLowerCase(),
      user.username.toLowerCase(),
      user.email.toLowerCase(),
      user.phone.toLowerCase()
    ];

    return searchTerms.every(term =>
      fields.some(field => field.includes(term))
    );
  });
};