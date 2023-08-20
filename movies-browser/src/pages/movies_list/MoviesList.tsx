import React, { useEffect, useState } from "react"
import Pagination from "@mui/material/Pagination"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchMovies } from "../../features/moviesList/moviesListSlice"
import { fetchSearchMovies } from "../../features/moviesList/searchMoviesSlice"
import MovieCard from "../../components/MovieCard"
import "./moviesList.css"
import { useNavigate } from "react-router-dom"
import { IconButton, InputBase } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

const API_KEY = import.meta.env.VITE_MOVIES_APP_API_KEY

function MoviesList() {
  const [moviesList, setMoviesList] = useState({})
  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const [searchValue, setSearchValue] = useState("")

  const navigate = useNavigate()

  const movies = useAppSelector((state: any) => {
    console.log(" - movies", state.movies)
    return state.movies
  })

  const searchMovies = useAppSelector((state: any) => {
    console.log("searhc - semo", state.searchMovies)
    return state.searchMovies
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchMovies(1))
    setMoviesList(movies)
  }, [])

  useEffect(() => {
    dispatch(fetchMovies(page))
    setMoviesList(movies)
  }, [page])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchValue) {
        console.log("page&&&&&&", page, searchValue)
        dispatch(
          fetchSearchMovies(
            `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${API_KEY}&page=${page}`,
          ),
        )
        setMoviesList(searchMovies)
      } else {
        dispatch(fetchMovies(1))
        setMoviesList(movies)
      }
    }, 500)

    return () => clearTimeout(timerId)
  }, [searchValue, page])

  return (
    <div>
      <div
        style={{
          border: "1px solid silver",
          width: "50%",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      {searchValue &&
      searchMovies.loading === "succeeded" &&
      searchMovies.movies.results?.length > 0 ? (
        <div className="movies">
          {searchMovies.movies.results.map((movie: any) => (
            <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <MovieCard
                title={movie.original_title}
                description={movie.overview.slice(0, 100) + "..."}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {movies.loading === "succeeded" && movies.movies.results?.length > 0 ? (
        <div className="movies">
          {movies.movies.results.map((movie: any) => (
            <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <MovieCard
                title={movie.original_title}
                description={movie.overview.slice(0, 100) + "..."}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
              />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <Pagination
        count={
          searchValue
            ? searchMovies.movies.total_pages
            : movies.movies.total_pages
        }
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ marginTop: "10px" }}
      />
    </div>
  )
}

export default MoviesList
