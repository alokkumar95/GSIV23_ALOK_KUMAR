import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = import.meta.env.VITE_MOVIES_APP_API_KEY

export const fetchCredits = createAsyncThunk("movie/fetchCredits", (id) => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
    .then((response) => response.data)
})

interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

interface MovieCredits {
  credits: {}
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: SerializedError
}

const initialState = {
  credits: {},
  loading: "idle",
  error: "",
} as MovieCredits

const movieCreditsSlice = createSlice({
  name: "movieCredits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCredits.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(fetchCredits.fulfilled, (state, action: any) => {
      state.loading = "succeeded"
      state.credits = action.payload
      state.error = { message: "" }
    })
    builder.addCase(fetchCredits.rejected, (state, action) => {
      state.loading = "failed"
      state.credits = {}
      state.error = action.error
    })
  },
})

export default movieCreditsSlice.reducer
