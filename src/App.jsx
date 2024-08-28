import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const urls = [
  BASE_URL + "/popular?language=en-US&page=1",
  BASE_URL + "/now_playing?language=en-US&page=1",
  BASE_URL + "/top_rated?language=en-US&page=1",
  BASE_URL + "/upcoming?language=en-US&page=1",
];
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const movieLists = [popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies];
  const setters = [setPopularMovies, setNowPlayingMovies, setTopRatedMovies, setUpcomingMovies];

  const loadMovies = async (url, setter) => {
    const response = await fetch(url, options);
    const data = await response.json();

    setter(data.results);
  };

  useEffect(() => {
    urls.forEach((url, index) => loadMovies(url, setters[index]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (upcomingMovies.length > 0) {
      setIsLoading(false);
    }
  }, [upcomingMovies]);

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <>
      {movieLists.map((movies, index) => (
        <>
          <ul key={index} className="movie-list">
            {movies.map(({ id, title, overview, release_date }) => (
              <li key={id}>
                <div>
                  <p>{title}</p>
                  <p>{overview}</p>
                  <p>{release_date}</p>
                </div>
              </li>
            ))}
          </ul>
          <hr />
        </>
      ))}
    </>
  );
}

export default App;
