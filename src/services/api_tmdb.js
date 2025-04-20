import axios from "axios";

const mainUrl = "https://api.themoviedb.org/3/";

const apiGet = async (endpoint) => {
  const targetUrl = mainUrl + endpoint;
  try {
    const response = await axios.get(`/api/proxy`, {
      params: { url: targetUrl },
    });
    return response.data;
  } catch (err) {
    console.error("apiGet error:", err);
    throw err;
  }
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
