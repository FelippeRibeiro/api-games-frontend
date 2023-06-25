import React from "react";
import Image from "next/image";
import { pombo } from "../util/pombo";

export default function Erro({ message, refetch }: { message: string; refetch: Function }) {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Image src={pombo} width={100} height={100} alt="pombo" className=""></Image>
      <div className="flex flex-col items-center w-80 bg-red-600  p-7 rounded-lg shadow-black shadow-lg ">
        <h1 className="text-black break-words text-center text-xl font-mono">{message}</h1>
        <button
          className="w-32 h-8 bg-blue-500 rounded-md m-11 shadow-black shadow-md hover:scale-105 hover:bg-blue-600 animate-bounce"
          onClick={() => {
            refetch();
          }}
        >
          Recarregar
        </button>
      </div>
    </div>
  );
}
