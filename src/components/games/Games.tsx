"use client";
import React from "react";
import Card from "../card/Card";
import { useQuery } from "react-query";
import { api } from "@/api-service";
import { IGames } from "@/api-service";
import { useState } from "react";

export default function Games() {
  console.log("Render");

  const [filter, setFilter] = useState("");
  const { data, isLoading, status } = useQuery({
    queryKey: "games",
    queryFn: getGames,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    onError: (error) => error,
  });

  const filteredGames =
    filter.length > 0
      ? data?.games?.filter((game) => game.title.toLowerCase().includes(filter.toLowerCase()))
      : data?.games;

  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="custom-loader"></div>
  //     </div>
  //   );
  // else
  return (
    <div>
      <section className="flex justify-center">
        <input
          type="text"
          className="p-1 "
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Busque um jogo..."
        />

        <select name="" id="">
          <option defaultValue={""}>Selecione um genero</option>
          {data?.genres?.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </section>

      <div className="grid grid-cols-3 max-md:grid-cols-1 max-xl:grid-cols-2 gap-5">
        {filteredGames?.map((game) => (
          <Card key={game.id} {...game}></Card>
        ))}
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

    return { games, genres };
  } catch (error) {
    console.log(error);
  }
}
