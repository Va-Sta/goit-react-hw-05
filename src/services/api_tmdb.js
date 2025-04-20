import axios from "axios";

const mainUrl = "https://api.themoviedb.org/3/";

const apiAccesToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDAxNWE3NzFkMDYxZGExYTg0NjFhZTYwOGZkZTUxZiIsIm5iZiI6MTc0NTA2OTI1MC4zNTY5OTk5LCJzdWIiOiI2ODAzYTRjMmUzZmFjMmY5MDI4OTk5ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DJiqxgHxb5oXzPhRrDk-z2dqrNl3SEgEmlVHKAs8SFo";

const options = {
  headers: {
    Authorization: `Bearer ${apiAccesToken}`,
  },
};

export const getConfig = () => {
  return apiGet("configuration");
};
export const getTrending = (page = 1) => {
  const params = new URLSearchParams({
    language: "en-US",
    page: page,
  });
  return apiGet(`trending/movie/day?${params.toString()}`);
};
export const getMovie = (id) => {
  const params = new URLSearchParams({
    language: "en-US",
  });
  return apiGet(`movie/${id}?${params.toString()}`);
};
export const getMovieCredits = (id) => {
  const params = new URLSearchParams({
    language: "en-US",
  });
  return apiGet(`movie/${id}/credits?${params.toString()}`);
};
export const getMovieReviews = (id) => {
  const params = new URLSearchParams({
    language: "en-US",
  });
  return apiGet(`movie/${id}/reviews?${params.toString()}`);
};
export const searchMovies = (query, page) => {
  const params = new URLSearchParams({
    query: query,
    include_adult: false,
    language: "en-US",
    page: page,
  });
  return apiGet(`search/movie?${params.toString()}`);
};

const apiGet = async (url) => {
  try {
    const response = await axios.get(mainUrl + url, options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
