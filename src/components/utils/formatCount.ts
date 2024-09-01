
export const formatCount = (
  count: number,
  options?: {
    label?: string;
    singular?: string;
    plural?: string;
    zero?: string;
  }
) => {
  const {
    label = "Currently found:",
    singular = "user",
    plural = "users",
    zero = "No users",
  } = options || {};

  if (count <= 0) {
    return zero;
  }

  return `${label} ${
    count === 1 ? `1 ${singular}` : `${count} ${plural}`
  }`;
};