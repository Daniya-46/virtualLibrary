import { useContext } from "react";
import { BooksContext } from "../contexts/BookContext";

export const useBookContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw Error("BooksContext must be used within BooksContextProvider");
  }

  return context;
};
