import { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Details } from "./components/Details";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { MovieList } from "./components/MovieList";

const KEY = "a7523db3";
const query = "the last samurai";

function App() {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(error);

  const handleDetails = async (id) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`,
      );

      if (!response.ok) {
        throw new Error("Algo deu errado ao realizar o fetching");
      }

      const data = await response.json();
      setDetails(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const movieLength = movies.length;

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
    fetchMovies();
  }, []);
  return (
    <div className=" h-full">
      <Header movieLength={movieLength} />
      <main className="w-full gap-4 sm:grid sm:grid-cols-2">
        <Container>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onGetDetails={handleDetails} />
          )}
          {error && <p>{error}</p>}
        </Container>
        <Container>
          <Details details={details} />
        </Container>
      </main>
    </div>
  );
}

export default App;
