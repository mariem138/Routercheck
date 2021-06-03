import React, { useState } from "react";
import './App.css';
import MovieList from "./MovieList";
import NavbarApp from "./NavbarApp";
import AddMovie from "./AddMovie";
import { Movies } from "./Movies";

function App(props) {
  const [search, setSearch] = useState("")
  const [star, setStar] = useState(1)
  const [movies, setMovies] = useState(Movies)

  let getSearch = (text) => {
    setSearch(text)
  }
  let getStar = (star) => {
    setStar(star)
  }
  
  return (
    <div className="App">
      <NavbarApp getSearch={getSearch} getStar={getStar} star={star} />
      <MovieList movies={movies.filter(el => el.rating >= star && el.title.toLowerCase().includes(search.toLowerCase()))} />
      <AddMovie addingFilm={setMovies} movies={movies} setUpdatedMovies={props.setUpdatedMovies}/>
    </div>
  );
}

export default App;