"use client";
import React from "react";
import { useQuery } from "react-query";
import { getGames } from "@/api-service";
import { useState } from "react";
import { AxiosError } from "axios";
import Load from "@/components/loading/Load";
import Erro from "@/components/error/Erro";
import Games from "@/components/games/Games";
import Select from "@/components/seletcFilter/Select";

export default function Home() {
  const [filter, setFilter] = useState("");

  const [genre, setGenres] = useState<string[]>([]);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "games",
    queryFn: getGames,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    onError: (error: AxiosError) => error,
  });

  let filteredGames = filter.length
    ? data?.games?.filter((game) => game.title.toLowerCase().includes(filter.toLowerCase()))
    : data?.games;

  if (genre.length) filteredGames = filteredGames?.filter((game) => genre.includes(game.genre));

  if (isLoading) return <Load />;
  if (error) return <Erro message={error.message} refetch={refetch}></Erro>;
  else
    return (
      <div className="flex">
        <nav className="h-full bg-[#171122] w-60 fixed max-lg:h-fit max-lg:w-full shadow-md shadow-black">
          <h1 className="text-center text-white mt-1 font-serif">API GAMES</h1>
          <div className="p-2 pt-0">
            <input
              type="text"
              className="border border-black w-full mt-5 rounded-lg mb-4
                placeholder:p-4"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search a game..."
            />

            <Select genres={data?.genres} setGenres={setGenres} />
          </div>
        </nav>
        <Games games={filteredGames} />
      </div>
    );
}
