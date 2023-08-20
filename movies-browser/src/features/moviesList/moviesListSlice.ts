import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// 'X-RapidAPI-Key':import.meta.env.VITE_SOME_KEY
//import MOVIES_APP_API_KEY from "./"

// Create the Thunk

const API_KEY = import.meta.env.VITE_MOVIES_APP_API_KEY

export const fetchMovies = createAsyncThunk("movies/fetchMovies", (page) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`,
    )
    .then((response) => {
      return response.data
    })
})

interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

interface MoviesList {
  movies: {}
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: SerializedError
}

const initialState = {
  movies: {},
  loading: "idle",
  error: "",
} as MoviesList

const moviesListSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(fetchMovies.fulfilled, (state, action: any) => {
      state.loading = "succeeded"
      state.movies = action.payload
      state.error = { message: "" }
    })
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = "failed"
      state.movies = []
      state.error = action.error
    })
  },
})

export default moviesListSlice.reducer
