import { useEffect, useState, useContext } from "react";
import { Link, useParams, Outlet, useLocation } from "react-router-dom";
import { getMovie } from "../../services/api_tmdb.js";
import { ConfigContext } from "../../context/ConfigContext";
import css from "./MovieDetailsPage.module.css";

const formatReleaseDate = (dateString) => {
  const options = { year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MovieDetailsPage = () => {
  const location = useLocation();
  const config = useContext(ConfigContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie(movieId)
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  if (!config) {
    return <p>Loading configuration...</p>;
  }

  return (
    <div className={css.container}>
      <Link to={location.state ?? "/movies"} className={css.backButton}>
        Back
      </Link>
      <div className={css.details}>
        {movie.backdrop_path && (
          <img
            src={config.images.base_url + "w500" + movie.backdrop_path}
            alt={movie.title}
            className={css.poster}
          />
        )}
        <div className={css.info}>
          <div className={css.infoTitle}>
            {movie.title}
            {movie.original_title !== movie.title &&
              ` (${movie.original_title})`}
            {movie.release_date &&
              ` (${formatReleaseDate(movie.release_date)})`}
          </div>

          <div className={css.infoText}>
            <h3>User score:</h3>{" "}
            <span>{Math.ceil(movie.vote_average * 10)}%</span>
          </div>
          <div className={css.infoText}>
            <h3>Overview:</h3> <span>{movie.overview}</span>
          </div>
          {movie.genres && movie.genres.length > 0 && (
            <div className={css.infoText}>
              <h3>Genres:</h3>
              <span>{movie.genres.map((g) => g.name).join(", ")}</span>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className={css.additionalInfo}>
        <h3>Additional information:</h3>
        <ul className={css.list}>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
