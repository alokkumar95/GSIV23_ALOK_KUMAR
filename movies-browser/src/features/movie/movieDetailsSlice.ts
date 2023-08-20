// https://api.themoviedb.org/3/movie/{movie_id}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = import.meta.env.VITE_MOVIES_APP_API_KEY

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  (movie_id) => {
    return axios
      .get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`)
      .then((response) => response.data)
  },
)

interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

interface MovieDetails {
  movieDetails: {}
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: SerializedError
}

const initialState = {
  movieDetails: {},
  loading: "idle",
  error: "",
} as MovieDetails

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(fetchMovieDetails.fulfilled, (state, action: any) => {
      state.loading = "succeeded"
      state.movieDetails = action.payload
      state.error = { message: "" }
    })
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.loading = "failed"
      state.movieDetails = {}
      state.error = action.error
    })
  },
})

export default movieDetailsSlice.reducer
