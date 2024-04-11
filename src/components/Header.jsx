import { Popcorn } from "lucide-react";
import { useEffect, useRef } from "react";

export function Header({ movieLength, onChangeQuery }) {
  const ref = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === ref.current) return;
      if (e.code === "Enter") {
        ref.current.focus();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);
  return (
    <header className="flex  flex-col items-center justify-center gap-4 rounded-md bg-indigo-600 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <h1 className="flex items-center gap-2 text-xl sm:text-2xl">
        <Popcorn />
        useMovies
      </h1>
      <input
        ref={ref}
        className="w-full max-w-lg rounded-md bg-transparent p-2 ring-1 ring-stone-300 focus:outline-none"
        placeholder="Procure o filme..."
        onChange={(e) => onChangeQuery(e.target.value)}
      />
      <span className="hidden whitespace-nowrap text-sm sm:block">
        Achamos
        <strong className="mx-1">{movieLength}</strong> filmes
      </span>
    </header>
  );
}
