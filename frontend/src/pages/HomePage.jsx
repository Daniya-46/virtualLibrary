import React from "react";
import BookCard from "../components/BookCard";
import BookSearch from "../components/BookSearch";
import { useBookContext } from "../hooks/useBookContext";
import { CircularProgress, Typography } from "@mui/material";
import Menu from "../components/Menu";

const HomePage = () => {
  const { state } = useBookContext();

  return (
    <>
      <div
        style={{
          padding: "10px",
          color: "#FAF3E0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Bibliotopia</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <BookSearch />
          <Menu />
        </div>
      </div>
      <hr
        style={{
          borderTop: "2px solid #FAF3E0",
          width: "100%",
          margin: "10px 0",
        }}
      />

      <div
        style={{
          display: "flex",
          overflowX: "auto",
        }}
      >
        {state.isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
              width: "100%",
            }}
          >
            <CircularProgress
              sx={{
                color: "#FAF3E0",
              }}
            />
          </div>
        ) : state.books.length === 0 ? (
          <Typography gutterBottom variant="h5" component="div">
            {state.resultTitle}
          </Typography>
        ) : (
          state.books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </>
  );
};

export default HomePage;
