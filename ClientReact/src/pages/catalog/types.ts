import { IGame } from "../../types/game"

export interface Categories{
  genres: string[],
  features: string[],
  platforms: string[]
}

export interface GamesResponse{
  games: IGame[],
  gamesLength: number
}