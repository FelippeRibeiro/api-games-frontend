"use client";
import React from "react";
import Card from "../card/Card";
import { useQuery } from "react-query";
import { IGames, api } from "@/api-service";
import { useState } from "react";
import { AxiosError } from "axios";

export default function Games() {
  console.log("Render");

  const [filter, setFilter] = useState("");
  const [genre, setGenres] = useState("");
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

  if (genre.length) filteredGames = filteredGames?.filter((game) => game.genre === genre);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="custom-loader"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600">
          {error.message}
          😭
        </h1>
      </div>
    );
  else
    return (
      <div className="flex justify-center flex-col">
        <section className="flex justify-center">
          <input
            type="text"
            className="p-1 "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Busque um jogo..."
          />

          <select name="" id="" onChange={(e) => setGenres(e.target.value)}>
            <option value={""}>Selecione um genero</option>
            {data?.genres?.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </section>

        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 p-9 gap-4">
            {filteredGames?.length ? (
              filteredGames?.map((game) => <Card key={game.id} {...game}></Card>)
            ) : (
              <div className="text-center text-white">Nenhum resultado encontrado</div>
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
