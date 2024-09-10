import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBookContext } from "../hooks/useBookContext";

const BookSearch = () => {
  const [query, setQuery] = useState("");

  const { dispatch } = useBookContext();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search: " + query);
    dispatch({ type: "SET_SEARCH_TERM", payload: query });
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      <TextField
        label="Search Books"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            color: "#8B7765",
            backgroundColor: "#F5F1E1",
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#6D4C41",
          borderRadius: "20px",
          color: "#FAF3E0",
          "&:hover": {
            backgroundColor: "#8B7765",
          },
        }}
      >
        <SearchIcon />
      </Button>
    </form>
  );
};

export default BookSearch;
