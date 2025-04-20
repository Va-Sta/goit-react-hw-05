import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api_tmdb.js";
import { ConfigContext } from "../../context/ConfigContext";
import noimage from "../../../public/no_actor_image.png";
import myimage from "../../../public/myimage.png";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const config = useContext(ConfigContext);
  const [movieCredits, setMovieCredits] = useState({});
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    getMovieCredits(movieId)
      .then((data) => {
        setMovieCredits(data);
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
  }, [movieId]);

  const handleFlip = (id) => {
    setFlipped((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (!config) {
    return <p>Loading configuration...</p>;
  }

  return (
    <ul className={css.castList}>
      {movieCredits.cast && movieCredits.cast.length > 0 ? (
        movieCredits.cast.map((item) => (
          <li key={item.id} className={css.castItem}>
            <div
              className={`${css.castCard} ${
                flipped[item.id] ? css.flipped : ""
              }`}
              onClick={() => handleFlip(item.id)}
            >
              <div className={css.front}>
                <img
                  className={css.castImage}
                  src={
                    item.profile_path
                      ? config.images.base_url + "w185" + item.profile_path
                      : noimage
                  }
                  alt={item.name}
                />
              </div>
              <div className={css.back}>
                <img className={css.castImage} src={myimage} alt="Actor back" />
              </div>
            </div>
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
