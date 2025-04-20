import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrending } from "../../services/api_tmdb.js";

const HomePage = () => {
  const [trending, setTrending] = useState({});
  useEffect(() => {
    getTrending()
      .then((data) => {
        setTrending(data);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
      });
  }, []);
  return (
    <>
      <h2>Trending movies:</h2>
      <MovieList list={trending} />
    </>
  );
};

export default HomePage;
