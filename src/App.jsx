import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Details } from "./components/Details";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { MovieDashBoard } from "./components/MovieDashBoard";
import { MovieList } from "./components/MovieList";

export const KEY = "a7523db3";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storagedValue = localStorage.getItem("watched");
    return storagedValue ? JSON.parse(storagedValue) : [];
  });
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const movieLength = movies.length;

  const handleChangeQuery = (value) => {
    setQuery(value);
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
  };

  const handleSelectedMovie = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddWatched = (movie) => {
    setWatched([...watched, movie]);
    handleCloseDetails();
  };

  const handleRemoveMovie = (id) => {
    const filteredById = watched.filter((movie) => movie.imdbID !== id);
    setWatched(filteredById);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Algo deu errado ao realizar o fetching");
        }

        const data = await response.json();

        if (data.Response === "False") throw new Error("Filme não encontrado");
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <div className=" h-full">
      <Header movieLength={movieLength} onChangeQuery={handleChangeQuery} />
      <main className="flex w-full flex-col sm:grid sm:grid-cols-2 sm:gap-4">
        <Container className="order-2 sm:order-none">
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onGetDetails={handleSelectedMovie} />
          )}
          {error && <p>{error}</p>}
        </Container>
        <Container className="order-1 sm:order-none">
          {selectedId ? (
            <Details
              id={selectedId}
              onClose={handleCloseDetails}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <MovieDashBoard
              watched={watched}
              onRemoveMovie={handleRemoveMovie}
            />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
