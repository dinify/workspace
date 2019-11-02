import { useDispatch } from "react-redux";

export function useAction<T>(actionCreator: (payload: T) => void) {
  const dispatch = useDispatch();
  return (payload: T) => dispatch(actionCreator(payload));
}
