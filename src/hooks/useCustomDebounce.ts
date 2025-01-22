import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useCustomDebounce = (
  action: (value: string) => any,
  delay: number = 700
) => {
  const dispatch = useDispatch();

  const debouncedAction = useCallback(
    debounce((value: string) => {
      dispatch(action(value));
    }, delay),
    [dispatch, action, delay]
  );

  return debouncedAction;
};
