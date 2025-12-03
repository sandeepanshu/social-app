import { v4 as uuid } from "uuid";
import { addAlert, removeAlert } from "./alert.slice";
import type { AppDispatch } from "../store";

// For components (thunk)
export const setAlert =
  (message: string, color: "success" | "danger" | "warning" | "info") =>
  (dispatch: AppDispatch) => {
    const id = uuid();

    dispatch(
      addAlert({
        id,
        message,
        color,
      })
    );

    setTimeout(() => {
      dispatch(removeAlert(id));
    }, 3000);
  };

// For sagas (plain action)
export const addAlertWithTimeout = (
  message: string, 
  color: "success" | "danger" | "warning" | "info"
) => {
  const id = uuid();
  return addAlert({
    id,
    message,
    color,
  });
};

// Helper function for sagas to remove alert after timeout
export const removeAlertAfterTimeout = (id: string) => {
  return removeAlert(id);
};