import axios, { AxiosResponse, AxiosError } from "axios";

export type GamesType = IGames[];

export interface IGames {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export const api = axios.create({
  baseURL: "https://games-test-api-81e9fb0d564a.herokuapp.com/api",
  headers: {
    "dev-email-address": "felipper43@gmail.com",
  },
  timeout: 5000,
  timeoutErrorMessage: "O servidor demorou para responder, tente mais tarde.",
});

api.interceptors.response.use(
  (res) => {
    console.log(res.status);
    return res;
  },
  (err: AxiosError) => {
    if (err.response?.status && [500, 502, 503, 504, 507, 508, 509].includes(err.response.status))
      throw new AxiosError("O servidor falhou em responder, tente recarregar a página.");
    else if (err.response?.status)
      throw new AxiosError(
        "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
      );
    else throw err;
  }
);

export async function getGames() {
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
