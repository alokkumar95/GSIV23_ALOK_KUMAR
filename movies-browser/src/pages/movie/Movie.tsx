import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchCredits } from "../../features/movie/movieSlice"
import { fetchMovieDetails } from "../../features/movie/movieDetailsSlice"
import { useParams } from "react-router-dom"
import "./movie.css"

function Movie() {
  const params = useParams()
  const [director, setDirector] = React.useState("")
  // const [description, setDescription]

  const movieCredits = useAppSelector((state) => {
    return state.movieCredits
  })

  const movieDetails = useAppSelector((state) => {
    console.log("details--", state.movieDetails)
    return state.movieDetails
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCredits(+params?.id))
    dispatch(fetchMovieDetails(+params.id))
  }, [])

  useEffect(() => {
    movieCredits?.credits?.crew?.filter(({ name, job }) => {
      if (job === "Director") {
        console.log("name---", name)
        setDirector(name)
      }
    })
  }, [movieCredits])

  function getMovieLength(minutes: number) {
    const HH = Math.floor(minutes / 60)
    const MM = minutes % 60

    return `${HH}:${MM}`
  }

  return (
    <div className="movie_detail_card">
      <img
        src={`https://image.tmdb.org/t/p/w300/${movieDetails.movieDetails.poster_path}`}
      />
      {movieCredits.loading === "succeeded" &&
        movieDetails.loading === "succeeded" && (
          <div className="movie_detail">
            <h3>
              {movieDetails.movieDetails.title}(
              {movieDetails.movieDetails.vote_average})
            </h3>
            <p>
              {movieDetails.movieDetails.release_date?.slice(0, 4)} |
              {" " + getMovieLength(movieDetails.movieDetails?.runtime)} |
              {" " + director}
            </p>
            <p>
              {movieCredits.credits.cast[0]?.name},
              {" " + movieCredits.credits.cast[1]?.name}, ...
            </p>
            <p>Description: {movieDetails.movieDetails.overview} </p>
          </div>
        )}
    </div>
  )
}

export default Movie
