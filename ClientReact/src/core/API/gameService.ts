import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import axios from "axios"
import applyCaseMiddleware from "axios-case-converter"
import { IGame } from "../../types/game"
import { AppDispatch } from "../../store/store"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Categories, GamesResponse } from "../../pages/catalog/types";
import { useParams } from "react-router-dom";

interface getGamesParams{
  categories: string,
  sortingItem: string,
  page: number,
  limit: number
}


export const getAllProducts = createAsyncThunk(
  'game/getAllGames',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IGame[]>('http://localhost:5002/Games?startpage=true&_page=1&_limit=5')
      return response.data
    } 
    catch (error) {
      return thunkAPI.rejectWithValue("Can't load games")
    }
  }
)

export const gameAPI = createApi({
  reducerPath: "gameAPI",
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5002'}),
  tagTypes: ['Game'],
  endpoints: (build) => ({

    getAllGames: build.query<GamesResponse, getGamesParams>({
      query: ({categories, sortingItem, page, limit}) => ({
        url: '/Games?' + categories,
        params:{          
          _sort: sortingItem,
          _page: page,
          _limit: limit
        }
      }),            
      providesTags: result => ['Game']    //это нужно чтобы не рефетчить после добавления нового itema на бек
    }),


    getAllCategories: build.query<Categories, any>({
      query: () => ({
        url: "/Categories"
      })
    }),


    // ======================================================
    // mutations
    // ======================================================

    createGame: build.mutation<IGame, IGame>({
      query: (game) => ({
        url: '/Games',
        method: "POST",
        body:game
      })
    })
  })
})






// old way



// export const GetAllGames = async () => {
//   const client = applyCaseMiddleware(axios.create())
//   const {data} = await client.get<IGame[]>("http://localhost:5205/api/catalog/games/")
//   const parsedData = data.map((game) => ({
//     ...game,
//     timeCreated: new Date(game.timeCreated)
//   }))
//   return parsedData
// }

// export const GetCategories = async () => {
//   const {data} = await axios.get<Category>("http://127.0.0.1:8000/api/gamestore/games/categories/")
//   return data
// }

// export const getAllGames = () => async (dispatch: AppDispatch) => {
//   try{
//     dispatch(gameSlice.actions.gamesFetching);
//     const response = await axios.get<IGame[]>('https://fakestoreapi.com/products?limit=5')
//     setTimeout(() => {      
//       dispatch(gameSlice.actions.gamesFetchingSuccess(response.data))
//     }, 500);   
//   }
//   catch (e){
//     dispatch(gameSlice.actions.gamesFetchingError(e.message))
//   }
// }