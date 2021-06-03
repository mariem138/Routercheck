import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import App from "./App";
import Annonce from './Annonce';
import { Movies } from "./Movies";
let movies = Movies;
function Routeur() {
    return (
        <BrowserRouter>
            <Route exact path="/" render={props =>
            (<App
            {...props} setUpdatedMovies={(updatedMovies) =>{
                movies = updatedMovies;
            }}/>)} />
            
            <Route path="/annonce/:url" render={props => <Annonce {...props} movies={movies} />}
            />
        </BrowserRouter>
    )
}

export default Routeur
