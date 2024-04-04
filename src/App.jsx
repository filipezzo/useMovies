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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );

        if (!response.ok) {
          throw new Error("Algo deu errado ao realizar o fetching");
        }

        const data = await response.json();

        if (data.Response === "False") throw new Error("Filme não encontrado");
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
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
  }, [query]);
  return (
    <div className=" h-full">
      <Header movieLength={movieLength} onChangeQuery={handleChangeQuery} />
      <main className="w-full gap-4 sm:grid sm:grid-cols-2">
        <Container>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onGetDetails={handleSelectedMovie} />
          )}
          {error && <p>{error}</p>}
        </Container>
        <Container>
          {selectedId ? (
            <Details id={selectedId} onClose={handleCloseDetails} />
          ) : (
            <MovieDashBoard />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
