import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BooksContextProvider } from "./contexts/BookContext";
import { UserContextProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
