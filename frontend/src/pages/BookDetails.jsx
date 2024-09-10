import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import coverImg from "../assets/bookCover.png";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate, useParams } from "react-router-dom";
import { useBookContext } from "../hooks/useBookContext";
import { useUserContext } from "../hooks/useUserContext";

const BookDetails = () => {
  const { id } = useParams();
  const { state } = useBookContext();
  const [book, setBook] = useState(null);
  const [loadingCover, setLoadingCover] = useState(true);
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      const getDescription = async () => {
        try {
          const response = await fetch(
            `http://openlibrary.org/works/${id}.json`
          );
          const data = await response.json();

          if (!data.description) {
            return "No description available.";
          }

          let rawDescription =
            typeof data.description === "object"
              ? data.description.value
              : data.description;

          const splitDescription = rawDescription.split(/Contains/i);
          const cleanedDescription = splitDescription[0].trim();

          return cleanedDescription;
        } catch (error) {
          console.error("Error fetching the description:", error);
          return "No description available.";
        }
      };

      const description = await getDescription();

      let bookData;

      if (state.category !== "") {
        bookData = state.genreBooks.find((b) => b.id === id);
      } else {
        bookData = state.books.find((b) => b.id === id);
      }

      if (!bookData) {
        console.error("Book not found in context");
        setBook(null);
        return;
      }

      // Handle different types for bookData.author
      let authors = "Unknown";
      if (Array.isArray(bookData.author)) {
        authors = bookData.author.join(", ");
      } else if (typeof bookData.author === "string") {
        authors = bookData.author;
      } else if (
        bookData.author &&
        typeof bookData.author === "object" &&
        bookData.author.name
      ) {
        authors = bookData.author.name;
      }

      const newBook = {
        id: bookData.id.replace("/works/", ""),
        isbn: bookData.isbn[0] || "Not found",
        title: bookData.title || "Not found",
        authors: authors,
        cover_id: bookData.cover_id || "",
        description:
          description !== "" ? description : "No description available",
        publish_year: bookData.first_publish_year || "Unknown",
        rating: bookData.rating || 0,
        edition_count: bookData.edition_count || "Unknown",
        genre: bookData.subject || [],
      };

      setBook(newBook);
    };

    fetchBookDetails();
  }, [id, state.books, state.genreBooks, state.category]);

  const handleBorrow = () => {
    dispatch({ type: "BORROW_BOOK", payload: book.id });
    navigate("/my-borrowed-books");
  };

  if (state.isLoading || !book) {
    return (
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
    );
  }

  const fullStars = Math.floor(book?.rating);
  const halfStar = book?.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      <div>
        <h1>{book?.title}</h1>
      </div>
      <Card
        sx={{
          display: "flex",
          alignItems: "flex-start",
          margin: "20px",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(182, 182, 182, 0.459)",
        }}
      >
        <Box>
          {loadingCover && (
            <Box
              sx={{
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
            </Box>
          )}
        </Box>

        <CardMedia
          component="img"
          image={
            book?.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
              : coverImg
          }
          alt={book?.title}
          onLoad={() => setLoadingCover(false)}
          onError={() => setLoadingCover(false)}
          sx={{
            height: 300,
            width: 300,
            borderRadius: "10px",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography variant="h6" color="text.secondary">
              Author(s): {book?.authors}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Publish Year: {book?.publish_year}
            </Typography>

            {book?.isbn && (
              <Typography variant="body2">ISBN: {book?.isbn}</Typography>
            )}
            <Typography variant="body2">OLID: {book?.id}</Typography>

            {book?.genre.length > 0 && (
              <Typography variant="body2">
                Genre: {book?.genre.join(", ")}
              </Typography>
            )}

            <Typography variant="body2">
              Description: {book?.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {book?.rating ? (
                <>
                  Ratings:
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <StarIcon key={`full-${index}`} />
                  ))}
                  {halfStar && <StarHalfIcon />}
                  {Array.from({ length: emptyStars }).map((_, index) => (
                    <StarBorderIcon key={`empty-${index}`} />
                  ))}
                </>
              ) : (
                <Typography>No ratings yet</Typography>
              )}
            </Box>
            <Typography variant="body2">
              Editions Count: {book?.edition_count}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#6D4C41",
                borderRadius: "20px",
                color: "#FAF3E0",
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "#8B7765",
                },
              }}
              onClick={handleBorrow}
            >
              Borrow
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default BookDetails;
