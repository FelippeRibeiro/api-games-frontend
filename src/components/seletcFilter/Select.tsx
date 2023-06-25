import React from "react";

export default function Select({
  setGenres,
  genres,
}: {
  setGenres: Function;
  genres: string[] | undefined;
}) {
  return (
    <div className="p-2 text-white">
      <p className="text-center">Select a genre</p>
      <select
        name=""
        id=""
        onChange={(e) => setGenres(e.target.value ? [e.target.value] : [])}
        className="border border-blue-400 rounded-md w-full h-full text-black"
      >
        <option value="">All</option>
        {genres?.map((game) => (
          <option key={game} value={game}>
            {game}
          </option>
        ))}
      </select>
    </div>
  );
}
