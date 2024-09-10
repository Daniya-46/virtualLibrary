import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookDetails from "./pages/BookDetails";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BorrowedBooks from "./pages/BorrowedBooks";
import { useUserContext } from "./hooks/useUserContext";

function App() {
  const { state } = useUserContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=<HomePage /> />
        <Route path="/book/:id" element=<BookDetails /> />
        <Route path="/categories/:category" element=<Categories /> />
        <Route path="/login" element=<Login /> />
        <Route path="/signup" element=<Signup /> />

        <Route
          path="/my-borrowed-books"
          element={state.user ? <BorrowedBooks /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
