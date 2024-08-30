export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const clamp01 = (x: number) => clamp(x, 0, 1);