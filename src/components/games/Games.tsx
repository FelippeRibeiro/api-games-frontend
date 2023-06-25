"use client";
import React from "react";
import Card from "../card/Card";
import { useQuery } from "react-query";
import { IGames, api } from "@/api-service";
import { useState } from "react";
import { AxiosError } from "axios";

export default function Games() {
  const [filter, setFilter] = useState("");

  const [genre, setGenres] = useState<string[]>([]);
  const { data, isLoading, status, error } = useQuery({
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="custom-loader"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600 break-words">
          {error.message}
          😭
        </h1>
      </div>
    );
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
              placeholder="Busque um jogo..."
            ></input>
            {/* <button className="">Buscar</button> */}

            <div className="p-2 text-white">
              <p className="text-center">Selecione um genero</p>
              <select
                name=""
                id=""
                onChange={(e) => setGenres(e.target.value ? [e.target.value] : [])}
                className="border border-blue-400 rounded-md w-full h-full text-black"
              >
                <option value="">Todos</option>
                {data?.genres?.map((game) => (
                  <option key={game} value={game}>
                    {game}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>

        <div className="flex ml-64 p-5 w-full justify-center max-lg:ml-0 max-lg:p-0 max-lg:mt-44">
          <div className="grid grid-cols-3 gap-14 max-xl:grid-cols-2 max-lg:grid-cols-1">
            {filteredGames?.length ? (
              filteredGames?.map((game) => <Card key={game.id} {...game}></Card>)
            ) : (
              <div className="text-white ">Nenhum resultado encontrado</div>
            )}
          </div>
        </div>
      </div>
    );
}

async function getGames() {
  try {
    const { data, status } = await api.get("/data");
    const games: IGames[] = data;
    console.log(games);
    console.log(status);

    const genres: string[] = [];
    games.forEach((game) => {
      if (!genres.includes(game.genre)) genres.push(game.genre);
    });

    return { games, genres: genres.sort() };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
