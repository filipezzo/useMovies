import { useEffect, useState } from "react";
import { KEY } from "../App";

export function Details({ id, onClose }) {
  const [details, setDetails] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = details;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`,
        );
        if (!res.ok) {
          throw new Error("algo deu errado!");
        }
        const data = await res.json();
        setDetails(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <header className="h-24 bg-neutral-950 p-4 shadow-md">
      {details ? <p>{title}</p> : <p>n tem</p>}
    </header>
  );
}
