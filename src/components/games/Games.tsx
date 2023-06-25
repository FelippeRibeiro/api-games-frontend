import { IGames } from "@/api-service";
import React from "react";
import Card from "../card/Card";

export default function Games({ games }: { games: IGames[] | undefined }) {
  return (
    <div className="flex ml-64 p-5 w-full justify-center max-lg:ml-0 max-lg:p-0 max-lg:mt-44">
      <div className="grid grid-cols-3 gap-14 max-lg:grid-cols-1 max-2xl:grid-cols-2">
        {games?.length ? (
          games.map((game) => <Card key={game.id} {...game}></Card>)
        ) : (
          <div className="text-white ">Nenhum resultado encontrado</div>
        )}
      </div>
    </div>
  );
}
