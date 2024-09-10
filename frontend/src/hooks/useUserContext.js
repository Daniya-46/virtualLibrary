import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("UserContext must be used within UserContextProvider");
  }

  return context;
};
