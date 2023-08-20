import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Create the Thunk

export const fetchSearchMovies = createAsyncThunk(
  "searchMovies/fetchSearchMovies",
  (apiEndPoint: string) => {
    console.log("query--page", apiEndPoint)
    return axios.get(apiEndPoint).then((response) => {
      return response.data
    })
  },
)

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

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(fetchSearchMovies.fulfilled, (state, action: any) => {
      state.loading = "succeeded"
      state.movies = action.payload
      state.error = { message: "" }
    })
    builder.addCase(fetchSearchMovies.rejected, (state, action) => {
      state.loading = "failed"
      state.movies = []
      state.error = action.error
    })
  },
})

export default searchMoviesSlice.reducer
