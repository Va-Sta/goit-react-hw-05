import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ list }) => {
  const location = useLocation();
  if (!list || !list.results) {
    return <p>No movies available.</p>;
  }
  return (
    <ul className={css.list}>
      {list.results &&
        list.results.map((item) => (
          <li className={css.item} key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.title} (
              {item.release_date && item.release_date
                ? new Date(item.release_date).getFullYear()
                : "N/A"}
              )
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MovieList;
