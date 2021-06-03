import React from 'react';
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
    let m = movies.map(el => <MovieCard el={el} />)
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {m}
        </div>
    )
}

export default MovieList
