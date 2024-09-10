import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import coverImg from "../assets/bookCover.png";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useBookContext } from "../hooks/useBookContext";

const BookCard = ({ book }) => {
  const fullStars = Math.floor(book.rating);
  const halfStar = book.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const { dispatch } = useBookContext();

  // console.log(book);
  const bookId = book.id.replace("/works/", "");

  if (!book) return null;

  return (
    <Link
      to={`/book/${bookId}`}
      style={{ textDecoration: "none" }}
      onClick={() => {
        dispatch({ type: "SET_SINGLE_BOOK", payload: book.id });
      }}
    >
      <Card
        sx={{
          minWidth: 200,
          maxWidth: 345,
          height: 400,
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(182, 182, 182, 0.459)",
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <img
            src={
              book.cover_id
                ? `https://covers.openlibrary.org/b/id/${book.cover_id}.jpg`
                : coverImg
            }
            alt={book.title}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "10px 10px 0 0",
              objectFit: "cover",
            }}
          />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "10px",
              height: "3em",
            }}
          >
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: "10px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.author}
          </Typography>
          <div>
            {book.rating ? (
              <>
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
