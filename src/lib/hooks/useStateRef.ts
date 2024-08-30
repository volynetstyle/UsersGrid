import { RefObject, useRef } from "react";

export function useStateRef<T>(value: T) {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref as Readonly<RefObject<T>>;
}