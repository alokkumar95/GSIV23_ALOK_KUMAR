import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
// import counterReducer from "../features/counter/counterSlice"
import moviesReducer from "../features/moviesList/moviesListSlice"
import movieCreditsReducer from "../features/movie/movieSlice"
import movieDetailsReducer from "../features/movie/movieDetailsSlice"
import searchMoviesReducer from "../features/moviesList/searchMoviesSlice"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieCredits: movieCreditsReducer,
    movieDetails: movieDetailsReducer,
    searchMovies: searchMoviesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
