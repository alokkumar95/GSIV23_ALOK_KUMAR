import "./App.css"
import MoviesList from "./pages/movies_list/MoviesList"
import Movie from "./pages/movie/Movie"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      {/* <div className="App">
      <MoviesList />
    </div> */}
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route index path="/" element={<MoviesList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
