import { Card } from "./Card";

export function MovieList({ movies, onGetDetails }) {
  return (
    <ul className="p-4 ">
      {movies.map((movie) => (
        <Card key={movie.imdbID} movie={movie} onGetDetails={onGetDetails} />
      ))}
    </ul>
  );
}
