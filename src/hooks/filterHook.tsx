import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export const FilterAuth = () => {
  const filterContext = useContext(FilterContext);
  return filterContext;
};
