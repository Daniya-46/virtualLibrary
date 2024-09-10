import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useUserContext } from "../hooks/useUserContext";
import { useBookContext } from "../hooks/useBookContext";
import BookCard from "../components/BookCard";

const BorrowedBooks = () => {
  const { state: userState } = useUserContext();
  const { state: bookState } = useBookContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }

    const findBorrowedBooks = () => {
      setLoading(true);

      // Find borrowed books from both books and genreBooks
      const foundBooks = userState.borrowedBooks
        .map((bookId) => {
          return (
            bookState.books.find((book) => book.id === bookId) ||
            bookState.genreBooks.find((book) => book.id === bookId)
          );
        })
        .filter(Boolean);

      setBorrowedBooks(foundBooks);
      setLoading(false);
    };

    findBorrowedBooks();
  }, [
    userState.user,
    userState.borrowedBooks,
    bookState.books,
    bookState.genreBooks,
    navigate,
  ]);

  return (
    <div>
      <h1>Borrowed Books History</h1>
      <Card
        sx={{
          minHeight: "300px",
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(182, 182, 182, 0.459)",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress
              sx={{
                color: "#FAF3E0",
              }}
            />
          ) : borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <Typography>You have borrowed no books!</Typography>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default BorrowedBooks;
