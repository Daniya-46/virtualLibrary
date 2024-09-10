import { createContext, useReducer } from "react";

export const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      localStorage.setItem("user", JSON.stringify(action.payload));
      const initialBorrowedBooks =
        JSON.parse(localStorage.getItem("borrowedBooks")) || [];
      return { user: action.payload, borrowedBooks: initialBorrowedBooks };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("borrowedBooks"); // Clear borrowedBooks on logout
      return { user: null, borrowedBooks: [] };
    case "BORROW_BOOK":
      const updatedBorrowedBooks = [...state.borrowedBooks, action.payload];
      localStorage.setItem(
        "borrowedBooks",
        JSON.stringify(updatedBorrowedBooks)
      );
      return { ...state, borrowedBooks: updatedBorrowedBooks };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    borrowedBooks: [],
  };

  try {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedBorrowedBooks = JSON.parse(
      localStorage.getItem("borrowedBooks")
    );

    if (savedUser) {
      initialState.user = savedUser;
    }

    if (Array.isArray(savedBorrowedBooks)) {
      initialState.borrowedBooks = savedBorrowedBooks;
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
