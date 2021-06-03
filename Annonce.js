import React from 'react';
import {Link } from "react-router-dom";
import ReactPlayer from 'react-player'


function Annonce(props) {
    console.log("props",props)
    const movieItem = props.movies.filter((movie) => movie.title === props.match.params.url)[0]; 
    console.log("movieItem",movieItem)
    return (
        <div className="container"  >
            <Link exact to="/"><button>BACK TO HOME</button></Link>
            <h5>Description of "{movieItem.title}" :</h5>
            <p style={{textAlign:"center"}}>{movieItem.description}</p>
            <div>
            <h5>Trailer of "{movieItem.title}" :</h5>
            <ReactPlayer 
                controls={true}
                url={movieItem.url} />
            </div>
        </div>
    )
}

export default Annonce
