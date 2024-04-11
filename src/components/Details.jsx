import { ArrowLeft, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { KEY } from "../App";
import { Loader } from "./Loader";
import { StarRating } from "./StarRating";

export function Details({ id, onClose, onAddWatched, watched }) {
  const [details, setDetails] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(id);
  const userRating = watched.find((movie) => movie.imdbID === id)?.rating;

  const {
    Title: title,

    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
  } = details;

  const handleIsClicked = () => setIsClicked(true);
  const handleBtnClick = () => {
    const newObj = {
      imdbID: id,
      imdbRating,
      runtime: Number(runtime.split(" ").at(0)),
      poster,
      title,
      rating: rating,
    };

    onAddWatched(newObj);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    window.document.title = `useMovies | ${title} `;

    return () => {
      window.document.title = "useMovies";
    };
  }, [title]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className=" relative flex gap-4 bg-neutral-950 shadow-md sm:items-center sm:gap-8">
            <img
              src={poster}
              className=" h-28 w-28 rounded-sm object-cover sm:h-40 sm:w-24 sm:rounded-none"
              alt={`imagem do ${poster}`}
            />
            <div className="flex-1 space-y-4 text-sm sm:text-base">
              <h2 className="sm:text-2xl">{title}</h2>
              <p>{released}</p>
              <p className="flex items-center  gap-2">
                <Star /> Média de {imdbRating}
              </p>
            </div>
            <button onClick={onClose} className="absolute left-2 top-0">
              {" "}
              <ArrowLeft size={24} className="font-bold text-white" />{" "}
            </button>
          </header>
          <div className="p-4">
            {!isWatched ? (
              <StarRating
                onAddWatched={onAddWatched}
                onCLicked={handleIsClicked}
                rating={rating}
                onRate={setRating}
              />
            ) : (
              <p>Sua nota para esse filme foi de {userRating}</p>
            )}
            {isClicked && (
              <div className=" flex items-center justify-center">
                <button
                  type="button"
                  className="  rounded-md border-none bg-none px-4 py-2 ring  ring-indigo-600 duration-300 hover:ring-white"
                  onClick={handleBtnClick}
                >
                  Adicionar a lista
                </button>
              </div>
            )}
            <p className="mx-auto my-8 flex max-w-md text-pretty ">{plot}</p>
          </div>
        </>
      )}
    </>
  );
}
