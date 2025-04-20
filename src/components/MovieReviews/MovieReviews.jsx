import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api_tmdb.js";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState({});

  useEffect(() => {
    getMovieReviews(movieId)
      .then((data) => {
        setMovieReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching movie reviews:", error);
      });
  }, [movieId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={css.reviewsContainer}>
      {movieReviews.results && movieReviews.results.length > 0 ? (
        <ul>
          {movieReviews.results.map((item) => (
            <li key={item.id} className={css.reviewCard}>
              <div className={css.reviewAuthor}>Review by {item.author}</div>
              <div className={css.reviewDate}>
                Date: {formatDate(item.created_at)}
              </div>
              <div className={css.reviewContent}>{item.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie</p>
      )}
    </div>
  );
};

export default MovieReviews;
