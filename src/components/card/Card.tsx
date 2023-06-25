import { IGames } from "@/api-service";
import React from "react";
import Image from "next/image";

export default function Card(game: IGames) {
  return (
    <div className="w-96 h-95 bg-[#1B1725] text-white rounded-lg flex flex-col items-center p-2 max-xl:w-80 hover:scale-105 hover:shadow-lg hover:shadow-black">
      <Image
        width={365}
        height={206}
        alt={`${game.title} game thumbnail`}
        src={game.thumbnail}
      ></Image>
      <div className="p-3">
        <h1 className="text-center font-bold font-serif">{game.title}</h1>
        <p className="text-center text-gray-500 mb-4 text-xs font-serif">{game.genre}</p>
        <h3>{game.short_description}</h3>
      </div>
    </div>
  );
}
