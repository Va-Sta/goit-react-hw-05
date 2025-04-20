import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { searchMovies } from "../../services/api_tmdb.js";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (query !== "") {
      searchMovies(query, page)
        .then((data) => {
          setMovies(data);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }, [query, page]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.input.value.trim();
    if (inputValue === "") {
      toast.error("Enter text for movie search");
      return;
    }
    if (inputValue === query) {
      toast.error("You already searched for this query");
      return;
    }
    setSearchParams({ query: inputValue, page: "1" });
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <h2>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            name="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            defaultValue={query}
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </h2>
      {movies.results && movies.results.length > 0 ? (
        <MovieList list={movies} />
      ) : (
        query !== "" && <p className={css.noMovies}>No movies found</p>
      )}
      <div className={css.pager}>
        {page > 1 && (
          <Link to={`?query=${query}&page=${Number(page) - 1}`}>Prev Page</Link>
        )}
        {movies.total_pages > page && (
          <Link to={`?query=${query}&page=${Number(page) + 1}`}>Next Page</Link>
        )}
      </div>
    </>
  );
};
export default MoviesPage;
