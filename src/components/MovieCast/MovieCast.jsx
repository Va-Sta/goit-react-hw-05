import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api_tmdb.js";
import { ConfigContext } from "../../context/ConfigContext";
import noimage from "../../../public/no_actor_image.png";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const config = useContext(ConfigContext);
  const [movieCredits, setMovieCredits] = useState({});

  useEffect(() => {
    getMovieCredits(movieId)
      .then((data) => {
        setMovieCredits(data);
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
  }, [movieId]);

  if (!config) {
    return <p>Loading configuration...</p>;
  }

  return (
    <ul className={css.castList}>
      {movieCredits.cast && movieCredits.cast.length > 0 ? (
        movieCredits.cast.map((item) => (
          <li key={item.id} className={css.castItem}>
            <img
              className={css.castImage}
              src={
                item.profile_path
                  ? config.images.base_url + "w185" + item.profile_path
                  : noimage
              }
              alt={item.name}
            />
            <div className={css.castInfo}>
              <div className={css.castName}>{item.name}</div>
              <div className={css.castCharacter}>as {item.character}</div>
            </div>
          </li>
        ))
      ) : (
        <p>No cast available for this movie</p>
      )}
    </ul>
  );
};

export default MovieCast;
