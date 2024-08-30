import { useCallback } from "react";
import { useStateRef } from "./useStateRef";

export default function useLastCallback<T extends AnyFunction>(callback?: T) {
  const ref = useStateRef(callback);

  // No need for ref dependency
  return useCallback(
    (...args: Parameters<T>) => ref.current?.(...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  ) as T;
}