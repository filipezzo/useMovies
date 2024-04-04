import { Calendar } from "lucide-react";

export function Card({ movie: { Title, Poster, Year, imdbID }, onGetDetails }) {
  return (
    <li
      onClick={() => onGetDetails(imdbID)}
      className="group flex cursor-pointer items-center justify-between gap-12 border-b border-b-neutral-700 py-4 duration-300"
    >
      <img
        className="size-16 rounded-sm object-cover group-hover:animate-pulse"
        src={Poster === "N/A" ? "https://placehold.co/64" : Poster}
        alt={`imagem do filme ${Title}`}
      />
      <div className="flex-1">
        <h3 className="font-bold group-hover:text-indigo-500 group-focus:text-indigo-500">
          {Title}
        </h3>
        <p className="flex items-center gap-1 group-hover:text-indigo-300">
          <span>
            <Calendar size={18} />
          </span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}
