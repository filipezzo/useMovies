import { Star, X } from "lucide-react";
import DashParagraph from "./DashParagraph";

export function MovieDashBoard({ watched, onRemoveMovie }) {
  if (!watched) return;

  return (
    <>
      <header className="h-20 bg-black/60  p-4 shadow-md">
        <h2 className="mb-4 text-center font-bold uppercase">
          Filmes assistidos
        </h2>
      </header>
      <ul className="p-4">
        {watched.length > 0 &&
          watched.map(({ imdbID, rating, poster, title }) => (
            <article key={imdbID} className="my-4">
              <figure className="flex gap-4">
                <img
                  className="h-20 w-12 rounded-sm object-cover"
                  src={poster}
                />

                <figcaption>
                  <h2 className="mb-2">{title}</h2>

                  <DashParagraph icon={<Star />} text={rating} />
                  <X
                    size={14}
                    className="m-1 cursor-pointer text-red-400"
                    onClick={() => onRemoveMovie(imdbID)}
                  />
                </figcaption>
              </figure>
            </article>
          ))}
      </ul>
    </>
  );
}
