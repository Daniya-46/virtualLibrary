import { createContext, useCallback, useEffect, useReducer } from "react";

export const BooksContext = createContext();

const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload,
        resultTitle: action.payload.length
          ? "Your search results"
          : "No search results found!",
      };
    case "SET_SINGLE_BOOK":
      return {
        ...state,
        singleBook: state.books.filter((book) => book.id === action.payload),
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_RESULT_TITLE":
      return { ...state, resultTitle: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_GENRE_BOOKS":
      return {
        ...state,
        genreBooks: action.payload,
        resultTitle: action.payload.length
          ? "Your search results"
          : "No search results found!",
      };
    default:
      return state;
  }
};

const URL = "https://openlibrary.org/search.json?title=";

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: [],
    singleBook: {},
    searchTerm: "the lord of the rings",
    isLoading: false,
    resultTitle: "",
    category: "",
    genreBooks: [],
  });

  const fetchBooks = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${URL}${state.searchTerm}`);

      const data = await response.json();
      // console.log(data.docs);

      if (data.docs) {
        const newBooks = data.docs.slice(0, 50).map((singleBook) => {
          const {
            key,
            isbn,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
            ratings_average,
            subject,
          } = singleBook;

          const id = key.replace("/works/", "");

          return {
            id,
            isbn,
            author: author_name,
            cover_id: cover_i,
            edition_count,
            first_publish_year,
            title,
            rating: ratings_average,
            subject,
          };
        });

        dispatch({ type: "SET_BOOKS", payload: newBooks });
        dispatch({ type: "SET_LOADING", payload: false });

        if (newBooks.length >= 1) {
          dispatch({
            type: "SET_RESULT_TITLE",
            payload: "Your search results",
          });
        } else {
          dispatch({
            type: "SET_RESULT_TITLE",
            payload: "No search results found!",
          });
        }
      } else {
        dispatch({ type: "SET_BOOKS", payload: [] });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "SET_RESULT_TITLE",
          payload: "No search results found!",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "SET_RESULT_TITLE",
        payload: "Error fetching search results!",
      });
    }
  }, [state.searchTerm]);
  console.log(state.books);

  useEffect(() => {
    fetchBooks();
  }, [state.searchTerm, fetchBooks]);

  return (
    <BooksContext.Provider value={{ state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};
