import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
