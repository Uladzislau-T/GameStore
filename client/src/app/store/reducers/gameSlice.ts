import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GameState, IGame } from "../../types/game"
import { getAllProducts } from "../../core/API/gameService";



const initialState: GameState = {
  games: [],
  isLoading: false,
  error: ""
}


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // gamesFetching(state) {
    //   state.isLoading = true;
    // },
    // gamesFetchingSuccess(state: any, action: PayloadAction<IGame[]>){
    //   state.isLoading = false;
    //   state.games = action.payload      
    // },
    // gamesFetchingError(state, action: PayloadAction<string>){
    //   state.isLoading = false;
    //   state.error = action.payload
    },
  extraReducers: {
    [getAllProducts.fulfilled.type]: (state: any, action: PayloadAction<IGame[]>) => {
        state.isLoading = false;
        state.error = ''
        state.games = action.payload;
    },
    [getAllProducts.pending.type]: (state) => {
        state.isLoading = true;
    },
    [getAllProducts.rejected.type]: (state,  action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload
    }
  }
});


export default gameSlice.reducer;





//old way before slices

// export const gameReducer = (state = initialState, action: GameAction) : GameState=> {
//   switch (action.type) {
//     case GameActionTypes.FETCH_GAME:
//       return {...state, loading: true}
//     case GameActionTypes.FETCH_GAME_SUCCESS:
//       return {...state, loading: false, games: action.payload}
//     case GameActionTypes.FETCH_GAME_ERROR:
//       return {...state, loading: false, error: action.payload}
//     default:
//       return state;
//   }
// }