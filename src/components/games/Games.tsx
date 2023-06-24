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
  console.log(genre);

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
            className="p-1 m-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Busque um jogo..."
          />

          <select
            name=""
            id=""
            onChange={(e) => setGenres(e.target.value ? [e.target.value] : [])}
            className="bg-blue-200 rounded-lg"
          >
            <option value={""} disabled defaultValue={""}>
              Selecione um genero
            </option>
            <option value="">Todos</option>
            {data?.genres?.map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </select>
        </section>

        <div className="flex flex-row gap-6 justify-center">
          {data?.genres?.map((game) => (
            <div key={game} className="text-white ">
              <label htmlFor={game}>{game}</label>
              <input
                type="checkbox"
                name={game}
                id=""
                value={game}
                onChange={(e) => {
                  if (!e.target.checked)
                    setGenres((old) => old.filter((i) => i !== e.target.value));
                  else setGenres((old) => [...old, e.target.value]);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 max-xl:grid-cols-2 p-9 gap-14">
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
