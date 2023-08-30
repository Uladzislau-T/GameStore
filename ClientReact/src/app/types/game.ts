export interface IGame{
  id: number,
  author: string,
  title: string,
  description: string,
  price: number,
  previewImage: string,
  mainImage: HTMLImageElement,
  timeCreated: Date,
  genres: string[],
  features: string[],
  platforms: string[]
}

export interface GameState {
  games: IGame[],
  isLoading: boolean,
  error: null|string
}
export enum GameActionTypes{
  FETCH_GAME= "FETCH_GAME",
  FETCH_GAME_SUCCESS= "FETCH_GAME_SUCCESS",
  FETCH_GAME_ERROR= "FETCH_GAME_ERROR"
}
interface FetchGameAction{
  type: GameActionTypes.FETCH_GAME
}
interface FetchGameSuccessAction{
  type: GameActionTypes.FETCH_GAME_SUCCESS,
  payload: IGame[]
}
interface FetchGameErrorAction{
  type: GameActionTypes.FETCH_GAME_ERROR,
  payload: string
}
export type GameAction =  FetchGameAction | FetchGameSuccessAction | FetchGameErrorAction