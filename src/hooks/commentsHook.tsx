import { useContext } from "react";
import { CommentsContext } from "../contexts/CommentsContext";

export const CommentsAuth = () => {
  const commentsContext = useContext(CommentsContext);
  return commentsContext;
};
