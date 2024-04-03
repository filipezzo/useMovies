import { Film, Sparkles, Star, Timer } from "lucide-react";

export function Details({ details }) {
  return (
    <header className="h-24 bg-neutral-950 p-4 shadow-md">
      <h2 className="font-bold">Filmes que você assistiu</h2>
      <div className="mb-4 mt-2 flex w-full items-center gap-4  p-2">
        <p className="flex flex-1 items-center gap-1 whitespace-nowrap">
          <Film />0
        </p>
        <p className="flex flex-1 items-center gap-1">
          <Star /> 0.00
        </p>
        <p className="flex flex-1 items-center gap-1">
          <Sparkles />0
        </p>
        <p className="flex flex-1 items-center gap-1">
          <Timer />0
        </p>
        <p>{details.Title}</p>
      </div>
    </header>
  );
}
