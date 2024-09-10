import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { CircularProgress, Typography } from "@mui/material";
import { useBookContext } from "../hooks/useBookContext";

const Categories = () => {
  const { category } = useParams();
  const { state, dispatch } = useBookContext();
  const genre = category.toLowerCase();

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        // Fetch books by category
        const response = await fetch(
          `https://openlibrary.org/subjects/${genre}.json?`
        );
        const data = await response.json();
        const books = data.works || [];

        // Fetch ratings for each book
        const booksWithRatings = await Promise.all(
          books.map(async (book) => {
            try {
              const tempDeets = await fetch(
                `https://openlibrary.org/search.json?title=${encodeURIComponent(
                  book.title
                )}`
              );
              const deets = await tempDeets.json();
              const firstMatch = deets.docs[0];

              if (firstMatch) {
                return {
                  id: book.key.replace("/works/", ""),
                  isbn: book.availability?.isbn ?? "Unknown",
                  title: book.title,
                  author: book.authors?.[0]?.name ?? "Unknown",
                  cover_id: book.cover_id,
                  edition_count: book.edition_count ?? 0,
                  first_publish_year: book.first_publish_year ?? "Unknown",
                  rating: firstMatch.ratings_average ?? 0,
                  subject: book.subject,
                };
              } else {
                return null;
              }
            } catch (error) {
              console.error(
                `Error fetching details for book: ${book.title}`,
                error
              );
              return null;
            }
          })
        );

        const validBooks = booksWithRatings.filter(Boolean);
        console.log(validBooks);

        dispatch({ type: "SET_GENRE_BOOKS", payload: validBooks });
      } catch (error) {
        console.error("Error fetching category books:", error);
        dispatch({
          type: "SET_RESULT_TITLE",
          payload: "Error fetching books.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchCategoryBooks();
  }, [genre, dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Category: {category}</h1>

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
      ) : state.genreBooks.length === 0 ? (
        <Typography>No books available in this category.</Typography>
      ) : (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
          }}
        >
          {state.genreBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
