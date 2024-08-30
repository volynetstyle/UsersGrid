import { RefObject, useRef } from "react";

const useRefInstead = <T>(ref?: RefObject<T>): RefObject<T> => {
  const internalRef = useRef<T>(null);

  return ref ?? internalRef;
};

export default useRefInstead;